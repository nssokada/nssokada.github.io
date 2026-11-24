// Each landing page is a view onto the same project collection.
// `projects: 'newest'` sorts by each project's sortDate (the base site's rule);
// an explicit array of project ids sets a hand-picked order for that audience.
export interface Audience {
  projects: 'newest' | string[];
  // Which alternate one-liner (frontmatter `emphasis.<key>`) to prefer, if present.
  emphasis?: string;
}

export const audiences = {
  home: { projects: 'newest' },
  research: { projects: 'newest' },
  neuroscience: {
    projects: ['anxiety-decision-making', 'deja-vu-vr-memory', 'emlt', 'llm-agents-compromise'],
    emphasis: 'neuroscience',
  },
  // Memory and language work. Linked from "cognition" in the homepage introduction.
  cognition: {
    projects: ['emlt', 'deja-vu-vr-memory'],
    emphasis: 'cognition',
  },
  ai: {
    projects: ['llm-agents-compromise', 'emlt'],
    emphasis: 'ai',
  },
  // EMLT is research, not a tool. Tools Noah is building will be added here later.
  tools: { projects: [] },
  product: { projects: ['emlt'], emphasis: 'product' },
  venture: { projects: ['emlt', 'llm-agents-compromise'], emphasis: 'venture' },
} satisfies Record<string, Audience>;

export type AudienceKey = keyof typeof audiences;
