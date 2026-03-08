/**
 * OpenAI Generation Module
 * Handles interaction with the OpenAI API to generate architectural concepts.
 */
import OpenAI from "openai";
import { ArchitecturalConcept } from "@/types/concept";

export async function generateWithOpenAI(prompt: string, apiKey?: string): Promise<ArchitecturalConcept> {
    // Prefer the user-provided API key from the frontend if they supplied one, 
    // otherwise fallback to the server environment variable.
    const key = apiKey || process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is not configured and no custom API key was provided.");

    const openai = new OpenAI({ apiKey: key });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using the mini model for speed and cost-efficiency
        messages: [
            { role: "system", content: "You are a senior world-class architect. Always return the output exactly in the requested JSON structure." },
            { role: "user", content: prompt }
        ],
        // Force the LLM to return data exactly matching our type definition
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
                    // All fields are required to ensure the frontend renders correctly
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
