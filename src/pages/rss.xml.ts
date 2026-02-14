import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser.astro";
import { sortByDate } from "@/lib/utils/sortFunctions";

export async function GET(context: APIContext) {
  // Try Sanity first, fallback to content collections (mirrors insights/index.astro)
  let items: { title: string; link: string; description: string; pubDate: Date }[] = [];

  try {
    const { client, queries } = await import("@/lib/sanity");
    const sanityPosts = await client.fetch(queries.posts);

    if (sanityPosts && sanityPosts.length > 0) {
      items = sanityPosts.map((post: any) => ({
        title: post.title,
        link: `/insights/${post.slug?.current}`,
        description: post.excerpt || "",
        pubDate: new Date(post.publishedAt || post._createdAt),
      }));
    }
  } catch {
    // Sanity unavailable — fall back to content collections
  }

  // Fallback to content collections if Sanity returned no results
  if (items.length === 0) {
    const posts = sortByDate(await getSinglePage("insights"));
    items = posts.map((post: any) => ({
      title: post.data.title,
      link: `/insights/${post.id}`,
      description: post.data.description || "",
      pubDate: new Date(post.data.date),
    }));
  }

  return rss({
    title: config.site.title,
    description: config.metadata.meta_description,
    site: context.site || config.site.base_url,
    items,
  });
}
