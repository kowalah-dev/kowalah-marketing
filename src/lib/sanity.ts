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
  useCdn: false, // Disabled for SSR pages to ensure fresh content from Sanity
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
  post: (slug: string) => `*[_type == "post" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
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
    "categories": categories[]->{ title, slug, _id }
  }`,

  // FAQ queries for Kowalah marketing site
  faqs: `*[_type == "faqItem" && !(_id in path("drafts.**"))] | order(priority asc, _createdAt desc) {
    ${commonFields}
    question,
    answer,
    category,
    priority,
    featured,
    tags
  }`,

  // Featured FAQs only
  featuredFaqs: `*[_type == "faqItem" && featured == true && !(_id in path("drafts.**"))] | order(priority asc) {
    ${commonFields}
    question,
    answer,
    category,
    priority,
    featured,
    tags
  }`,

  // FAQs by category
  faqsByCategory: (category: string) => `*[_type == "faqItem" && category == "${category}" && !(_id in path("drafts.**"))] | order(priority asc) {
    ${commonFields}
    question,
    answer,
    category,
    priority,
    featured,
    tags
  }`,

  // Recommended books queries
  books: `*[_type == "recommendedBook" && !(_id in path("drafts.**"))] | order(order asc) {
    ${commonFields}
    title,
    slug,
    author,
    "coverImage": coverImage.asset,
    "categories": categories[]->title,
    publishedAt,
    featured
  }`,

  // Single book
  book: (slug: string) => `*[_type == "recommendedBook" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
    ${commonFields}
    title,
    slug,
    author,
    "coverImage": coverImage.asset,
    content,
    authorResources,
    "categories": categories[]->title,
    publishedAt,
    featured
  }`,

  // Legal pages (terms, privacy policy, etc.)
  legalPage: (slug: string) => `*[_type == "legalPage" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
    ${commonFields}
    title,
    slug,
    pageType,
    effectiveDate,
    lastUpdated,
    content,
    seo {
      title,
      description,
      keywords
    }
  }`,

  // Wednesday Webinars - all webinars ordered by date (newest first)
  webinars: `*[_type == "webinar" && !(_id in path("drafts.**"))] | order(date desc) {
    ${commonFields}
    title,
    slug,
    date,
    status,
    shortDescription,
    topics,
    registrationLink,
    youtubeUrl,
    duration
  }`,

  // Upcoming webinars only (for spotlight and preview sections)
  upcomingWebinars: `*[_type == "webinar" && status == "upcoming" && !(_id in path("drafts.**"))] | order(date asc) {
    ${commonFields}
    title,
    slug,
    date,
    shortDescription,
    topics,
    registrationLink,
    duration
  }`,

  // Past webinars only (for archive section)
  pastWebinars: `*[_type == "webinar" && status == "completed" && !(_id in path("drafts.**"))] | order(date desc) {
    ${commonFields}
    title,
    slug,
    date,
    shortDescription,
    topics,
    youtubeUrl,
    duration
  }`,

  // Single webinar detail with full content and related posts
  webinar: (slug: string) => `*[_type == "webinar" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
    ${commonFields}
    title,
    slug,
    date,
    duration,
    status,
    shortDescription,
    description,
    topics,
    sessionStructure,
    registrationLink,
    youtubeUrl,
    "relatedBlogPosts": relatedBlogPosts[]->{
      title,
      slug,
      excerpt,
      publishedAt,
      "image": featuredImage.asset,
      "categories": categories[]->{ title, slug, _id }
    }
  }`
};