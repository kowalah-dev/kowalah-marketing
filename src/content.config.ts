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

const productCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/product" }),
  schema: z.object({
    // Core metadata
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    
    // Hero section for product value proposition
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      cta_primary: z.object({
        label: z.string(),
        link: z.string(),
        subtext: z.string().optional()
      }),
      product_screenshot: z.string().optional()
    }),
    
    // Problem/solution positioning (flexible for different products)
    problem_solution: z.object({
      title: z.string(),
      problem_statement: z.string(),
      solution_overview: z.string(),
      trust_elements: z.array(z.string()),
      image: z.string().optional() // Product-specific problem/solution image
    }).optional(),
    
    // Product capabilities/features (flexible for different products)
    capabilities: z.object({
      title: z.string(), // Dynamic section title (e.g., "What Expert Requests Can We Create?")
      items: z.array(z.object({
        title: z.string(),
        icon: z.string(),
        description: z.string(),
        details: z.array(z.string()), // Tasks, features, or benefits
        value_proposition: z.string()
      }))
    }).optional(),
    
    // How it works demonstration with video support
    how_it_works: z.object({
      title: z.string(),
      subtitle: z.string(),
      steps: z.array(z.object({
        step_number: z.number(),
        title: z.string(),
        description: z.string()
      })),
      demo: z.object({
        type: z.enum(['screenshots', 'video', 'both']), // Specify demo content type
        screenshots: z.array(z.string()).optional(), // Array of screenshot paths
        video: z.object({
          youtube_id: z.string(), // YouTube video ID
          title: z.string().optional(), // Video title for accessibility
          poster: z.string().optional(), // Custom thumbnail image
          start_time: z.number().optional() // Start time in seconds
        }).optional(),
        description: z.string()
      }).optional()
    }).optional(),
    
    // Competitive advantage section
    competitive_advantage: z.object({
      title: z.string(),
      subtitle: z.string(),
      key_message: z.string(),
      advantages: z.array(z.object({
        point: z.string(),
        description: z.string()
      }))
    }).optional(),
    
    // Use cases/scenarios
    use_cases: z.object({
      title: z.string(), // Dynamic section title (e.g., "What Problems Do Expert Requests Solve?")
      items: z.array(z.object({
        scenario: z.string(),
        solution: z.string(),
        outcome: z.string()
      }))
    }).optional(),
    
    // Integrations section
    integrations: z.object({
      title: z.string(),
      subtitle: z.string(),
      current_state: z.string(),
      available_integrations: z.array(z.string())
    }).optional(),
    
    // Social proof
    social_proof: z.object({
      title: z.string(),
      subtitle: z.string(),
      testimonials: z.array(z.object({
        name: z.string(),
        role: z.string(),
        company: z.string(),
        quote: z.string(),
        metrics: z.string().optional()
      })).optional(),
      success_metrics: z.array(z.string()).optional()
    }).optional(),
    
    // Featured showcase carousel
    featured_showcase: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      items: z.array(z.object({
        image: z.string(),
        title: z.string(),
        type: z.string(), // e.g., "Prompt", "GPT", "Template", "Workshop", "Case Study", "Framework"
        category: z.string(), // e.g., "AI Strategy", "Training", "Governance", "Implementation"
        description: z.string(),
        link: z.string().optional()
      }))
    }).optional(),
    
    // Features list (for product overview page)
    features: z.array(
      z.object({
        title: z.string().optional(),
        subtitle: z.string(),
        image: z.unknown(),
        points: z.array(z.object({ icon: z.string(), detail: z.string() })),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ).optional(),
    
    // Conversion section
    conversion: z.object({
      title: z.string(),
      subtitle: z.string(),
      offer_description: z.string().optional(),
      cta: z.object({
        label: z.string(),
        link: z.string(),
        subtext: z.string()
      }).optional(),
      card: z.array(
        z.object({
          title: z.string().optional(),
          image: z.string(),
          button: z.object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
          }),
        }),
      ).optional()
    }).optional()
  })
});

const solutionCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/solution" }),
  schema: z.object({
    // Core metadata
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    
    // Solution type classification
    solution_type: z.enum(['service', 'role', 'industry']), // service (ChatGPT deployment), role (CEO/CIO), industry (healthcare/finance)
    target_audience: z.string(), // e.g., "CEOs at mid-sized enterprises", "CIOs implementing ChatGPT"
    industry: z.string().optional(), // For industry-specific solutions
    
    // Hero section for solution value proposition
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      cta_primary: z.object({
        label: z.string(),
        link: z.string(),
        subtext: z.string().optional()
      }),
      solution_image: z.string().optional() // Solution-specific hero image
    }),
    
    // Problem/solution positioning (critical for solutions)
    problem_solution: z.object({
      title: z.string(),
      problem_statement: z.string(),
      solution_overview: z.string(),
      trust_elements: z.array(z.string()),
      pain_points: z.array(z.string()).optional(), // Specific challenges this solution addresses
      image: z.string().optional() // Solution-specific problem/solution image
    }),
    
    // Solution approach/process (how Kowalah delivers the solution)
    solution_approach: z.object({
      title: z.string(), // e.g., "Our ChatGPT Enterprise Deployment Process"
      subtitle: z.string(),
      phases: z.array(z.object({
        phase_number: z.number(),
        title: z.string(),
        description: z.string(),
        deliverables: z.array(z.string()), // What clients receive in this phase
        timeline: z.string().optional() // e.g., "Week 1-2", "30 days"
      }))
    }).optional(),
    
    // Solution capabilities/components (what's included)
    solution_components: z.object({
      title: z.string(), // e.g., "What's Included in ChatGPT Enterprise Deployment"
      items: z.array(z.object({
        title: z.string(),
        icon: z.string(),
        description: z.string(),
        details: z.array(z.string()), // Specific tasks, deliverables, or benefits
        value_proposition: z.string()
      }))
    }).optional(),
    
    // Success outcomes and metrics
    success_outcomes: z.object({
      title: z.string(),
      subtitle: z.string(),
      metrics: z.array(z.object({
        metric: z.string(),
        value: z.string(),
        description: z.string()
      })),
      success_stories: z.array(z.string()).optional()
    }).optional(),
    
    // Implementation timeline and process
    implementation: z.object({
      title: z.string(),
      subtitle: z.string(),
      duration: z.string(), // e.g., "6-8 weeks", "90 days"
      steps: z.array(z.object({
        step_number: z.number(),
        title: z.string(),
        description: z.string(),
        duration: z.string().optional()
      })),
      demo: z.object({
        type: z.enum(['screenshots', 'video', 'both']),
        screenshots: z.array(z.string()).optional(),
        video: z.object({
          youtube_id: z.string(),
          title: z.string().optional(),
          poster: z.string().optional(),
          start_time: z.number().optional()
        }).optional(),
        description: z.string()
      }).optional()
    }).optional(),
    
    // ROI and business case
    business_case: z.object({
      title: z.string(),
      subtitle: z.string(),
      roi_metrics: z.array(z.object({
        metric: z.string(),
        value: z.string(),
        timeframe: z.string()
      })),
      cost_savings: z.array(z.string()).optional(),
      efficiency_gains: z.array(z.string()).optional()
    }).optional(),
    
    // Use cases/scenarios specific to this solution
    use_cases: z.object({
      title: z.string(),
      items: z.array(z.object({
        scenario: z.string(),
        challenge: z.string(),
        solution: z.string(),
        outcome: z.string()
      }))
    }).optional(),
    
    // Requirements and prerequisites
    requirements: z.object({
      title: z.string(),
      prerequisites: z.array(z.string()),
      technical_requirements: z.array(z.string()).optional(),
      organizational_requirements: z.array(z.string()).optional()
    }).optional(),
    
    // Pricing/investment information
    investment: z.object({
      title: z.string(),
      subtitle: z.string(),
      pricing_model: z.string(), // e.g., "Fixed project fee", "Monthly retainer", "Success-based"
      starting_price: z.string().optional(),
      pricing_factors: z.array(z.string()).optional(),
      what_included: z.array(z.string())
    }).optional(),
    
    // Featured resources and templates
    featured_resources: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      items: z.array(z.object({
        image: z.string(),
        title: z.string(),
        type: z.string(), // e.g., "Template", "Framework", "Checklist", "Training"
        category: z.string(), // e.g., "Implementation", "Change Management", "Governance"
        description: z.string(),
        link: z.string().optional()
      }))
    }).optional(),
    
    // Social proof specific to this solution
    social_proof: z.object({
      title: z.string(),
      subtitle: z.string(),
      testimonials: z.array(z.object({
        name: z.string(),
        role: z.string(),
        company: z.string(),
        quote: z.string(),
        metrics: z.string().optional()
      })).optional(),
      case_studies: z.array(z.object({
        company_type: z.string(),
        challenge: z.string(),
        solution: z.string(),
        result: z.string()
      })).optional()
    }).optional(),
    
    // Next steps/conversion section
    conversion: z.object({
      title: z.string(),
      subtitle: z.string(),
      offer_description: z.string(),
      cta: z.object({
        label: z.string(),
        link: z.string(),
        subtext: z.string()
      }),
      consultation_offer: z.object({
        title: z.string(),
        description: z.string(),
        duration: z.string(),
        cta: z.object({
          label: z.string(),
          link: z.string()
        })
      }).optional()
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
  product: productCollection,
  reviews: reviewsCollection,
  sections: sectionsCollection,
  solution: solutionCollection,
};
