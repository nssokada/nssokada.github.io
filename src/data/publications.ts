export interface Publication {
  key: string;
  authors: string;
  year: string;
  title: string;
  venue: string;
  kind: 'Journal article' | 'Conference paper' | 'Conference abstract' | 'Workshop paper' | 'Case report';
  note?: string;
  href?: string;
}

// Source: Noah's CV (CV_current.pdf, Nov 2026), with each DOI checked against Crossref/PubMed.
// Listed newest first.
export const publications: Publication[] = [
  {
    key: 'llm-compromise-2026',
    authors: 'Okada, N. S.*, Garg, K.*, Deng, W.*, & Mobbs, D.',
    year: '2026',
    title: 'Do LLM agents compromise like humans? Risk and responsibility in dyadic decision-making',
    venue: 'SocialAgent: Second Workshop on Large Language Models for Social Reasoning and Simulation, NeurIPS 2026',
    kind: 'Workshop paper',
    note: 'Accepted. *Equal contribution.',
  },
  {
    key: 'eye-gaze-familiarity-2024',
    authors: 'Castillon, I., Chartier, T., Venkatesha, V., Okada, N. S., Davis, A., Cleary, A. M., & Blanchard, N.',
    year: '2024',
    title: 'Automatically identifying the human sense of familiarity using eye gaze features',
    venue: 'International Conference on Human-Computer Interaction (HCII 2024), Lecture Notes in Computer Science, 291–310',
    kind: 'Conference paper',
    href: 'https://doi.org/10.1007/978-3-031-60405-8_19',
  },
  {
    key: 'vr-paradigm-2024',
    authors:
      'Okada, N. S., McNeely-White, K. L., Cleary, A. M., Carlaw, B. N., Drane, D. L., Parsons, T. D., McMahan, T., Neisser, J., & Pedersen, N. P.',
    year: '2023',
    title: 'A virtual reality paradigm with dynamic scene stimuli for use in memory research',
    venue: 'Behavior Research Methods, 56(7), 6440–6463',
    kind: 'Journal article',
    href: 'https://doi.org/10.3758/s13428-023-02243-w',
  },
  {
    key: 'pnes-case-2023',
    authors:
      'Drane, D. L., Hewitt, K. C., Price, M. E., Rush, B. K., Blackmon, K., Okada, N., Shade, T., Valentin, E., Vinson, J., Rosen, P., & Loring, D. W.',
    year: '2023',
    title:
      'Case study of invalid to valid shift in cognitive performance following successful treatment of psychogenic nonepileptic seizure events',
    venue: 'Journal of Clinical and Experimental Neuropsychology, 45(10), 1024–1038',
    kind: 'Case report',
    href: 'https://doi.org/10.1080/13803395.2024.2335600',
  },
  {
    key: 'cardio-mental-health-2022',
    authors:
      'Chen, S., Okada, N., Zheng, Y., Bueno, H. C., Park, R., Frias, J., Peterson, B., Gonzalez, D., Perez-Haddock, Y., Tourgeman, I., & Balcells-Camps, M.',
    year: '2022',
    title: 'Relationship between the methods of monitoring cardiovascular disease and mental health',
    venue: 'Neuromodulation: Technology at the Neural Interface, 25(7), S322',
    kind: 'Conference abstract',
    href: 'https://doi.org/10.1016/j.neurom.2022.08.387',
  },
  {
    key: 'deja-vu-case-2021',
    authors:
      'Cleary, A. M., Neisser, J., McMahan, T., Parsons, T. D., Alwaki, A., Okada, N., Vosoughi, A., Kheder, A., Drane, D. L., & Pedersen, N. P.',
    year: '2021',
    title:
      'Subjective distinguishability of seizure and non-seizure déjà vu: A case report, brief literature review, and research prospects',
    venue: 'Epilepsy & Behavior, 125, 108373',
    kind: 'Case report',
    href: 'https://doi.org/10.1016/j.yebeh.2021.108373',
  },
];

export const publicationsByKey = Object.fromEntries(publications.map((p) => [p.key, p]));
