import { createClient } from "@/utils/supabase/server";
import { ConceptFormData, ArchitecturalConcept } from "@/types/concept";

export async function saveConceptToDatabase(
    userId: string,
    promptData: ConceptFormData,
    generatedConcept: ArchitecturalConcept
) {
    try {
        const supabase = await createClient();

        // Remove the api key before saving to DB for security/cleanliness
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
        // We log the error but don't typically want to crash the whole request 
        // if the generation succeeded but the save failed, though this depends on precise requirements.
        console.error("Failed to save concept to database:", dbErr);
    }
}
