"use server";

import { ConceptFormData, ArchitecturalConcept } from "@/types/concept";
import { generateArchitecturalConcept } from "@/lib/llm";
import { saveConceptToDatabase } from "@/lib/db/concepts";
import { createClient } from "@/utils/supabase/server";

/**
 * Main Server Action for generating a new architectural concept.
 * This function orchestrates the LLM call and Database save, and is called directly from the frontend form.
 */
export async function generateConceptAction(data: ConceptFormData): Promise<ArchitecturalConcept> {

    // 1. Generate Concept via AI (dynamically targets Gemini or OpenAI based on input)
    const conceptResult = await generateArchitecturalConcept(data);

    // 2. Fetch User Session securely from the server
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    // 3. Save to Database (only if the user is authenticated)
    if (authData?.user) {
        await saveConceptToDatabase(authData.user.id, data, conceptResult);
    }

    // 4. Return to Client to render the UI
    return conceptResult;
}
