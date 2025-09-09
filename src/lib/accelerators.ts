import type { Accelerator, AcceleratorData } from '../types/accelerator';
import acceleratorData from '../data/accelerators.json';

// Helper function to get all accelerators
export function getAllAccelerators(): Accelerator[] {
  return (acceleratorData as AcceleratorData).accelerators;
}

// Helper function to get featured accelerators
export function getFeaturedAccelerators(): Accelerator[] {
  const data = acceleratorData as AcceleratorData;
  return data.accelerators.filter(acc => data.featured.includes(acc.id));
}

// Helper function to get accelerators by type
export function getAcceleratorsByType(type: string): Accelerator[] {
  return getAllAccelerators().filter(acc => acc.type === type);
}

// Helper function to get types
export function getTypes() {
  return (acceleratorData as AcceleratorData).types;
}

// Helper function to format accelerator for carousel component
export function formatAcceleratorForCarousel(accelerator: Accelerator) {
  return {
    image: accelerator.image,
    title: accelerator.title,
    type: accelerator.type,
    difficulty: accelerator.difficulty,
    description: accelerator.description,
    outcomes: accelerator.outcomes || [],
    link: accelerator.link
  };
}

// Helper function to get featured accelerators formatted for carousel
export function getFeaturedAcceleratorsForCarousel() {
  return getFeaturedAccelerators().map(formatAcceleratorForCarousel);
}