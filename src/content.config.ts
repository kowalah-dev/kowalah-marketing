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
    service_components: z.object({
      title: z.string(),
      subtitle: z.string(),
      components: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          pricing: z.object({
            USD: z.object({
              prefix: z.string(),
              amount: z.string(),
              suffix: z.string(),
              detail: z.string(),
            }),
            EUR: z.object({
              prefix: z.string(),
              amount: z.string(),
              suffix: z.string(),
              detail: z.string(),
            }),
            GBP: z.object({
              prefix: z.string(),
              amount: z.string(),
              suffix: z.string(),
              detail: z.string(),
            }),
          }),
          features: z.array(z.string()),
          what_included: z.string(),
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

    // New service-based pricing structure with multi-currency support
    service_components: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        pricing: z.object({
          USD: z.object({
            prefix: z.string(),
            amount: z.string(),
            suffix: z.string(),
            detail: z.string(),
            range: z.string(),
          }),
          EUR: z.object({
            prefix: z.string(),
            amount: z.string(),
            suffix: z.string(),
            detail: z.string(),
            range: z.string(),
          }),
          GBP: z.object({
            prefix: z.string(),
            amount: z.string(),
            suffix: z.string(),
            detail: z.string(),
            range: z.string(),
          }),
        }),
        features: z.array(z.string()),
        what_included: z.string(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ).optional(),

    investment_examples: z.object({
      title: z.string(),
      subtitle: z.string(),
      examples: z.array(
        z.object({
          organization_size: z.string(),
          pricing: z.object({
            USD: z.object({
              deployment_cost: z.string(),
              enablement_cost: z.string(),
              managed_annual: z.string(),
              total_year_one: z.string(),
            }),
            EUR: z.object({
              deployment_cost: z.string(),
              enablement_cost: z.string(),
              managed_annual: z.string(),
              total_year_one: z.string(),
            }),
            GBP: z.object({
              deployment_cost: z.string(),
              enablement_cost: z.string(),
              managed_annual: z.string(),
              total_year_one: z.string(),
            }),
          }),
          description: z.string(),
        }),
      ),
    }).optional(),

    decision_guide: z.object({
      title: z.string(),
      subtitle: z.string(),
      scenarios: z.array(
        z.object({
          situation: z.string(),
          recommendation: z.string(),
          description: z.string(),
          next_step: z.string(),
        }),
      ),
    }).optional(),

    // Legacy structure for backward compatibility
    pricing_tab: z.array(z.string()).optional(),
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
    ).optional(),

    compare: z.object({
      title: z.string().optional(),
      subtitle: z.string(),
      components: z.array(z.object({ name: z.string() })).optional(),
      plans: z.array(z.object({ name: z.string() })).optional(),
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

const solutionsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/solutions" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),

    // Core identifiers for flexible content
    solution_type: z.enum(["role", "industry"]),
    solution_category: z.string(), // "ceos", "cios", "manufacturing", "healthcare"

    hero: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.array(
        z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string()
        })
      )
    }),

    // Flexible challenges section - adapts to role vs industry
    challenges: z.object({
      title: z.string(),
      subtitle: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
          category: z.string().optional() // "strategic", "operational", "compliance"
        })
      )
    }),

    solution: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      points: z.array(z.string())
    }),

    benefits: z.object({
      title: z.string(),
      subtitle: z.string(),
      points: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          image: z.string(),
          metric: z.string().optional() // ROI, compliance score, efficiency gain
        })
      )
    }),

    social_proof: z.object({
      testimonials: z.array(
        z.object({
          name: z.string(),
          title: z.string(),
          company: z.string(),
          company_size: z.string().optional(),
          industry: z.string(),
          quote: z.string(),
          image: z.string(),
          proof_type: z.enum(["role_peer", "industry_peer", "case_study"])
        })
      ),
      case_studies: z.array(
        z.object({
          title: z.string(),
          company: z.string(),
          industry: z.string(),
          challenge: z.string(),
          solution: z.string(),
          results: z.array(z.string()),
          link: z.string().optional()
        })
      ).optional()
    }),

    implementation: z.object({
      title: z.string(),
      subtitle: z.string(),
      approach: z.enum(["executive", "industry", "technical"]),
      steps: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
          timeline: z.string().optional()
        })
      )
    }),

    // Industry-specific fields (optional)
    regulatory: z.object({
      title: z.string(),
      requirements: z.array(z.string()),
      compliance_note: z.string()
    }).optional(),

    // Role-specific fields (optional)
    executive_focus: z.object({
      title: z.string(),
      subtitle: z.string(),
      areas: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string()
        })
      )
    }).optional(),

    // Services highlight section (optional)
    services_highlight: z.object({
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
            link: z.string()
          })
        })
      )
    }).optional(),

    cta: z.object({
      title: z.string(),
      content: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string()
      })
    })
  })
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
  solutions: solutionsCollection,
};
