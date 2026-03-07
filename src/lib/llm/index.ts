import { ConceptFormData, ArchitecturalConcept } from "@/types/concept";
import { generateWithGemini } from "./gemini";
import { generateWithOpenAI } from "./openai";

export async function generateArchitecturalConcept(data: ConceptFormData): Promise<ArchitecturalConcept> {
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
        return generateWithGemini(prompt, data.apiKey);
    } else {
        return generateWithOpenAI(prompt, data.apiKey);
    }
}
