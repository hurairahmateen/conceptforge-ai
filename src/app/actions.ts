"use server";

import { ConceptFormData, ArchitecturalConcept } from "@/types/concept";
import { generateArchitecturalConcept } from "@/lib/llm";
import { saveConceptToDatabase } from "@/lib/db/concepts";
import { createClient } from "@/utils/supabase/server";

export async function generateConceptAction(data: ConceptFormData): Promise<ArchitecturalConcept> {

    // 1. Generate Concept via AI
    const conceptResult = await generateArchitecturalConcept(data);

    // 2. Fetch User Session
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    // 3. Save to Database (if authenticated)
    if (authData?.user) {
        await saveConceptToDatabase(authData.user.id, data, conceptResult);
    }

    // 4. Return to Client
    return conceptResult;
}
