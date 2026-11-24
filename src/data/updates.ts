// Short dated notes, newest first. Shown on /updates/ and (latest few) on the homepage.
// `date` is "YYYY" or "YYYY-MM". `text` may contain Markdown links: [label](/path/ or https://…).
export interface Update {
  date: string;
  text: string;
}

export const updates: Update[] = [
  {
    date: '2026',
    text: '[Do LLM agents compromise like humans?](/projects/llm-agents-compromise/) was accepted to the SocialAgent workshop at NeurIPS 2026.',
  },
  {
    date: '2025-06',
    text: 'Spent the summer as a Venture Fellow with the Caltech Office of Technology Transfer and Caltech Seed Fund.',
  },
  {
    date: '2025',
    text: 'Joined the Board of Directors of Caltech Student-Faculty Programs (SURF).',
  },
  {
    date: '2024',
    text: 'Named a Hertz Fellowship finalist.',
  },
  {
    date: '2023-10',
    text: 'Our [virtual reality paradigm for memory research](/projects/deja-vu-vr-memory/) is out in Behavior Research Methods.',
  },
  {
    date: '2023-09',
    text: 'Started my PhD at Caltech with Dean Mobbs, supported by an NSF Graduate Research Fellowship.',
  },
];
