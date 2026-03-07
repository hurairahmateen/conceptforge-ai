"use server";

import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from "openai";
import { ConceptFormData, ArchitecturalConcept } from "@/types/concept";
import { createClient } from "@/utils/supabase/server";

export async function generateConceptAction(data: ConceptFormData): Promise<ArchitecturalConcept> {
    let conceptResult: ArchitecturalConcept;

    const prompt = `
    As a senior world-class architect, generate a comprehensive architectural concept based on the following project details:
    
    Project Type: ${data.projectType}
    Site Area: ${data.siteArea}
    Location/Climate: ${data.location}
    Client Priorities: ${data.priorities}
    Design Style: ${data.designStyle}
    Additional Notes: ${data.additionalNotes}
    
    Provide a visionary concept that feels professional, innovative, and deeply rooted in architectural theory.
    `;

    if (data.llmProvider === "gemini") {
        const apiKey = data.apiKey || process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("GEMINI_API_KEY is not configured and no custom API key was provided.");
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        conceptName: { type: Type.STRING },
                        overview: { type: Type.STRING },
                        designPhilosophy: { type: Type.STRING },
                        zoningBreakdown: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        materialPalette: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        sustainabilityNotes: { type: Type.STRING }
                    },
                    required: ["conceptName", "overview", "designPhilosophy", "zoningBreakdown", "materialPalette", "sustainabilityNotes"]
                }
            }
        });

        if (!response.text) {
            throw new Error("Failed to generate content with Gemini.");
        }
        conceptResult = JSON.parse(response.text) as ArchitecturalConcept;
    } else {
        const apiKey = data.apiKey || process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY is not configured and no custom API key was provided.");
        const openai = new OpenAI({ apiKey });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a senior world-class architect. Always return the output exactly in the requested JSON structure." },
                { role: "user", content: prompt }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "architectural_concept",
                    schema: {
                        type: "object",
                        properties: {
                            conceptName: { type: "string" },
                            overview: { type: "string" },
                            designPhilosophy: { type: "string" },
                            zoningBreakdown: {
                                type: "array",
                                items: { type: "string" }
                            },
                            materialPalette: {
                                type: "array",
                                items: { type: "string" }
                            },
                            sustainabilityNotes: { type: "string" }
                        },
                        required: ["conceptName", "overview", "designPhilosophy", "zoningBreakdown", "materialPalette", "sustainabilityNotes"],
                        additionalProperties: false
                    },
                    strict: true
                }
            }
        });

        const resultText = completion.choices[0].message?.content;
        if (!resultText) {
            throw new Error("Failed to generate content with OpenAI.");
        }

        conceptResult = JSON.parse(resultText) as ArchitecturalConcept;
    }

    try {
        const supabase = await createClient();
        const { data: authData } = await supabase.auth.getUser();

        if (authData?.user) {
            const { apiKey, ...safePromptData } = data;

            await supabase.from('concepts').insert({
                user_id: authData.user.id,
                prompt_data: safePromptData,
                generated_content: conceptResult,
            });
        }
    } catch (dbErr) {
        console.error("Failed to save concept to database:", dbErr);
    }

    return conceptResult;
}
