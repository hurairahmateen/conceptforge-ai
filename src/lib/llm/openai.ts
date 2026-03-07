import OpenAI from "openai";
import { ArchitecturalConcept } from "@/types/concept";

export async function generateWithOpenAI(prompt: string, apiKey?: string): Promise<ArchitecturalConcept> {
    const key = apiKey || process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is not configured and no custom API key was provided.");

    const openai = new OpenAI({ apiKey: key });

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

    return JSON.parse(resultText) as ArchitecturalConcept;
}
