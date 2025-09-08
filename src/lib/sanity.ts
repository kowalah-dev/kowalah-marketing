import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Missing PUBLIC_SANITY_PROJECT_ID");
}

if (!import.meta.env.PUBLIC_SANITY_DATASET) {
  throw new Error("Missing PUBLIC_SANITY_DATASET");
}

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: "2024-05-08", // use a UTC date string
  token: import.meta.env.SANITY_API_TOKEN, // Only needed if you want to update content with the client
});

// Helper function for generating image URLs
const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Common query fragments for reuse
export const commonFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
`;

// Example queries - adapt these to your content structure
export const queries = {
  // Simplified blog posts query 
  blogPosts: `*[_type == "blogPost"] | order(_createdAt desc) {
    ${commonFields}
    title,
    slug,
    excerpt,
    publishedAt,
    "image": featuredImage.asset,
    "author": author->name,
    categories[]->title
  }`,
  
  // Single blog post
  blogPost: (slug: string) => `*[_type == "blogPost" && slug.current == "${slug}"][0] {
    ${commonFields}
    title,
    slug,
    content,
    excerpt,
    publishedAt,
    "image": featuredImage.asset,
    "author": author->{name, image},
    categories[]->{title, slug}
  }`,
  
  // Simplified page content (instead of complex block structure)
  pageContent: (slug: string) => `*[_type == "page" && slug.current == "${slug}"][0] {
    ${commonFields}
    title,
    slug,
    seo {
      title,
      description,
      image
    },
    content
  }`,
  
  // Homepage content 
  homepage: `*[_type == "homepage"][0] {
    ${commonFields}
    hero {
      title,
      subtitle,
      cta {
        text,
        url
      },
      "image": backgroundImage.asset
    },
    sections[] {
      _type,
      title,
      content,
      "image": image.asset
    }
  }`
};