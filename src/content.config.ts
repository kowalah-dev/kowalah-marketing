import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const careerCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/career" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z.object({ title: z.string().optional(), content: z.string() }),
    about: z.object({
      title: z.string().optional(),
      content: z.string(),
      image: z.string(),
      stats: z.array(
        z.object({ title: z.string().optional(), value: z.number() }),
      ),
    }),
    slider: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        avatar: z.string(),
        company: z.string(),
        review: z.string(),
        stats: z.object({ about: z.string().optional(), value: z.string() }),
      }),
    ),
  }),
});

const caseCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/case" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    stats: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
    draft: z.boolean().optional(),
    hero: z
      .object({ title: z.string().optional(), content: z.string() })
      .optional(),
  }),
});

const changelogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/changelog" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
  }),
});

const companyCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/company" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z.object({ title: z.string().optional(), content: z.string() }),
    about: z.object({
      title: z.string().optional(),
      content: z.string(),
      image: z.string(),
      stats: z.array(
        z.object({ title: z.string().optional(), value: z.number() }),
      ),
      trusted: z.object({
        title: z.string().optional(),
        partners: z.array(z.string()),
      }),
    }),
    slider: z.array(z.string()),
    why: z.object({
      title: z.string().optional(),
      subtitle: z.string(),
      image: z.string(),
      badge: z.string(),
      reason: z.string(),
      content: z.string(),
      points: z.array(
        z.object({
          title: z.string().optional(),
          icon: z.string(),
          content: z.string(),
        }),
      ),
    }),
    job: z.object({
      title: z.string().optional(),
      subtitle: z.string(),
      jobs: z.array(
        z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          details: z.array(z.object({ info: z.string(), icon: z.string() })),
        }),
      ),
    }),
    faq: z.object({ title: z.string().optional(), subtitle: z.string() }),
  }),
});

const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean(),
    info: z.object({
      title: z.string().optional(),
      content: z.string(),
      contacts: z.array(
        z.object({
          title: z.string().optional(),
          icon: z.string(),
          details_1: z.string(),
          details_2: z.string(),
        }),
      ),
    }),
  }),
});

const faqCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/faq" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  }),
});


const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    hero: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.array(
        z.object({ enable: z.boolean(), label: z.string(), link: z.string() }),
      ),
      customer: z.object({ image: z.array(z.string()), note: z.string() }).optional(),
    }),
    feature: z.object({
      title: z.string(),
      subtitle: z.string(),
      features: z.array(
        z.object({
          title: z.string(),
          badge: z.string(),
          content: z.string(),
          description: z.string(),
          image: z.string(),
          button: z.object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
          }),
        }),
      ),
    }),
    transformation: z.object({
      title: z.string(),
      subtitle: z.string(),
      before: z.object({
        organizational: z.array(z.string()),
        individual: z.array(z.string()),
      }),
      after: z.object({
        organizational: z.array(z.string()),
        individual: z.array(z.string()),
      }),
      mindset_shift: z.object({
        from: z.string(),
        to: z.string(),
      }),
    }).optional(),
    program_depth: z.object({
      title: z.string(),
      subtitle: z.string(),
      differentiator: z.string(),
      categories: z.array(
        z.object({
          title: z.string(),
          icon: z.string().optional(),
          elements: z.array(
            z.object({
              name: z.string(),
              description: z.string(),
            }),
          ),
        }),
      ),
    }).optional(),
    offering: z.array(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        image: z.string(),
        image_1: z.string(),
        content: z.string(),
        points: z.array(z.string()),
      }),
    ),
    benefits: z.object({
      title: z.string(),
      subtitle: z.string(),
      points: z.array(
        z.object({ title: z.string(), content: z.string(), image: z.string() }),
      ),
    }),
    plan: z.object({
      title: z.string(),
      subtitle: z.string(),
      plans_labels: z.array(z.string()),
      plans: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          price_prefix: z.string(),
          price_monthly: z.string(),
          price_yearly: z.string(),
          price_suffix: z.object({ one: z.string(), two: z.string() }),
          features: z.array(z.string()),
          button: z.object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
          }),
        }),
      ),
    }),
  }),
});

const insightsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/insights" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).optional(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
    hero: z
      .object({ title: z.string().optional(), content: z.string() })
      .optional(),
  }),
});

const integrationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/integrations" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    integrations: z.array(
      z.object({
        name: z.string(),
        subtitle: z.string(),
        logo: z.string(),
        type: z.string(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    update: z.date().optional(),
    draft: z.boolean(),
  }),
});

const pricingCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pricing" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z.object({ title: z.string().optional(), content: z.string() }),
    pricing_tab: z.array(z.string()),
    pricing_card: z.array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        price_prefix: z.string(),
        price_monthly: z.string(),
        price_yearly: z.string(),
        price_suffix: z.object({ one: z.string(), two: z.string() }),
        features: z.array(z.string()),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
    compare: z.object({
      title: z.string().optional(),
      subtitle: z.string(),
      plans: z.array(z.object({ name: z.string() })),
      categories: z.array(
        z.object({
          name: z.string(),
          features: z.array(
            z.object({ name: z.string(), values: z.array(z.boolean()) }),
          ),
        }),
      ),
    }),
    faq: z.object({ title: z.string().optional(), subtitle: z.string() }),
  }),
});

const reviewsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/reviews" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    reviews: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        avatar: z.string(),
        company: z.string(),
        review: z.string(),
      }),
    ),
  }),
});

const sectionsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    enable: z.boolean().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    testimonials: z
      .array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: z.string(),
          content: z.string(),
          image: z.string().optional(),
        }),
      )
      .optional(),
    reviews: z
      .array(
        z.object({
          customerName: z.string(),
          customerAvatar: z.string(),
          customerDesignation: z.string(),
          review: z.string(),
        }),
      )
      .optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    button: z
      .object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      })
      .optional(),
  }),
});



// Export collections
export const collections = {
  career: careerCollection,
  case: caseCollection,
  changelog: changelogCollection,
  company: companyCollection,
  contact: contactCollection,
  faq: faqCollection,
  homepage: homepageCollection,
  insights: insightsCollection,
  integrations: integrationsCollection,
  pages: pagesCollection,
  pricing: pricingCollection,
  reviews: reviewsCollection,
  sections: sectionsCollection,
};
