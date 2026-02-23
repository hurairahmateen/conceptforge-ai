export interface ConceptFormData {
    projectType: string;
    siteArea: string;
    location: string;
    priorities: string;
    designStyle: string;
    additionalNotes: string;
    llmProvider: 'gemini' | 'openai';
    apiKey?: string;
}

export interface ArchitecturalConcept {
    conceptName: string;
    overview: string;
    designPhilosophy: string;
    zoningBreakdown: string[];
    materialPalette: string[];
    sustainabilityNotes: string;
}
