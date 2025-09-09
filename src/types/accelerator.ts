export interface Accelerator {
  id: string;                    // Unique identifier (matches future Supabase ID)
  title: string;                  // Name of the accelerator
  description: string;            // Short description for cards
  type: string;                   // "Prompt", "GPT", "Template", "Training Materials", "Code", "Integration"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;                  // Path to screenshot/image
  outcomes: string[];             // What users will achieve (required for cards)
  
  // Optional enhancement fields
  longDescription?: string;       // Optional longer description
  tags?: string[];                // Additional categorization
  duration?: string;              // For workshops/training (e.g., "45 minutes")
  prerequisites?: string[];       // What users need to know
  link?: string;                  // Preview or more info link
  featured?: boolean;             // Whether to show in featured carousel
  
  // Metadata
  createdAt?: string;             // ISO date string
  updatedAt?: string;             // ISO date string
}

export interface AcceleratorType {
  name: string;
  color: string;                  // Tailwind color class (e.g., "blue-500")
  icon: string;                   // Icon identifier
  description?: string;           // Type description
}

export interface AcceleratorData {
  types: Record<string, AcceleratorType>;
  accelerators: Accelerator[];
  featured: string[];             // Array of accelerator IDs to feature
}