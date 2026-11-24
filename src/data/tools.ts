// Tooling that does not yet have a public project page.
// Status labels were confirmed by Noah (Nov 2026): do not upgrade them without checking.
export interface ToolItem {
  name: string;
  status: 'Planned' | 'In development' | 'Released';
  description?: string;
}

export const toolsInProgress: ToolItem[] = [
  { name: 'AI productivity system', status: 'In development' },
  {
    name: 'Technical diligence tooling',
    status: 'In development',
    description:
      'Continues the AI diligence platform I built as a Venture Fellow with the Caltech Office of Technology Transfer and Caltech Seed Fund in 2025.',
  },
  { name: 'Techno-economic analysis', status: 'In development' },
];
