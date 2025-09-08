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

// Blog post queries
export const queries = {
  // Published blog posts for listing
  posts: `*[_type == "post" && defined(publishedAt) && publishedAt <= now() && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) {
    ${commonFields}
    title,
    slug,
    excerpt,
    publishedAt,
    "image": featuredImage.asset,
    "author": author->{name, image, bio},
    "categories": categories[]->{ title, slug, _id }
  }`,
  
  // Single blog post
  post: (slug: string) => `*[_type == "post" && slug.current == "${slug}"][0] {
    ${commonFields}
    title,
    slug,
    body,
    sections[] {
      _type,
      _type == "textSection" => {
        content
      },
      _type == "imageSection" => {
        "image": image.asset,
        alt,
        caption,
        size
      },
      _type == "videoSection" => {
        youtubeId,
        caption,
        startTime,
        aspectRatio
      },
      _type == "tableSection" => {
        table,
        caption,
        styling
      }
    },
    excerpt,
    publishedAt,
    "image": featuredImage.asset,
    "author": author->{name, image, bio},
    "categories": categories[]->{ title, slug, _id },
    seo {
      title,
      description,
      keywords
    }
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
  }`,

  // FAQ queries for Kowalah marketing site
  faqs: `*[_type == "faqItem"] | order(priority asc, _createdAt desc) {
    ${commonFields}
    question,
    answer,
    category,
    priority,
    featured,
    tags
  }`,

  // Featured FAQs only
  featuredFaqs: `*[_type == "faqItem" && featured == true] | order(priority asc) {
    ${commonFields}
    question,
    answer,
    category,
    priority,
    featured,
    tags
  }`,

  // FAQs by category
  faqsByCategory: (category: string) => `*[_type == "faqItem" && category == "${category}"] | order(priority asc) {
    ${commonFields}
    question,
    answer,
    category,
    priority,
    featured,
    tags
  }`
};