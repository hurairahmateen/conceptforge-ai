import { GoogleGenAI, Type } from "@google/genai";
import { ArchitecturalConcept } from "@/types/concept";

export async function generateWithGemini(prompt: string, apiKey?: string): Promise<ArchitecturalConcept> {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is not configured and no custom API key was provided.");

    const ai = new GoogleGenAI({ apiKey: key });

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

    return JSON.parse(response.text) as ArchitecturalConcept;
}
