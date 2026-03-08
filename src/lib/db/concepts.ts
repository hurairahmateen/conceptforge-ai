/**
 * Database Interaction Module
 * Contains specific repository functions for interacting with the Supabase database.
 */
import { createClient } from "@/utils/supabase/server";
import { ConceptFormData, ArchitecturalConcept } from "@/types/concept";

export async function saveConceptToDatabase(
    userId: string,
    promptData: ConceptFormData,
    generatedConcept: ArchitecturalConcept
) {
    try {
        const supabase = await createClient();

        // Remove the api key before saving to DB to ensure secrets are never stored
        const { apiKey, ...safePromptData } = promptData;

        const { error } = await supabase.from('concepts').insert({
            user_id: userId,
            prompt_data: safePromptData,
            generated_content: generatedConcept,
        });

        if (error) {
            console.error("Supabase insert error:", error)
            throw new Error("Failed to insert concept into database");
        }
    } catch (dbErr) {
        // We log the error but do not crash the request
        // to ensure the user still receives their generated concept on the frontend even if the save fails.
        console.error("Failed to save concept to database:", dbErr);
    }
}
