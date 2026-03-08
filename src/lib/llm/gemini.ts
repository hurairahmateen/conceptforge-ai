/**
 * Gemini Generation Module
 * Handles interaction with Google's Gemini API to generate architectural concepts.
 */
import { GoogleGenAI, Type } from "@google/genai";
import { ArchitecturalConcept } from "@/types/concept";

export async function generateWithGemini(prompt: string, apiKey?: string): Promise<ArchitecturalConcept> {
    // Prefer the user-provided API key from the frontend if they supplied one, 
    // otherwise fallback to the server environment variable.
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is not configured and no custom API key was provided.");

    const ai = new GoogleGenAI({ apiKey: key });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // Flash is highly efficient for standard text-generation workflows
        contents: prompt,
        config: {
            // Force the LLM to return data exactly matching our type definition as JSON
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
                // All fields are required to ensure the frontend renders correctly
                required: ["conceptName", "overview", "designPhilosophy", "zoningBreakdown", "materialPalette", "sustainabilityNotes"]
            }
        }
    });

    if (!response.text) {
        throw new Error("Failed to generate content with Gemini.");
    }

    return JSON.parse(response.text) as ArchitecturalConcept;
}
