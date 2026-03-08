/**
 * LLM Facade Router
 * Acts as the centralized entry point for all AI interactions.
 * Routes the request to the specific provider (Gemini or OpenAI) based on user selection.
 */
import { ConceptFormData, ArchitecturalConcept } from "@/types/concept";
import { generateWithGemini } from "./gemini";
import { generateWithOpenAI } from "./openai";

export async function generateArchitecturalConcept(data: ConceptFormData): Promise<ArchitecturalConcept> {
    // Compile all user form inputs into a single prompt for the LLMs.
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

    // Route to the appropriate provider based on what they selected in the UI
    if (data.llmProvider === "gemini") {
        return generateWithGemini(prompt, data.apiKey);
    } else {
        return generateWithOpenAI(prompt, data.apiKey);
    }
}
