export const medications = [
  {
    id: 'S1',
    name: 'Formula S1 — Rapid-Melt',
    mechanism: 'Ramelteon (Melatonin Receptor Agonist)',
    tagline: '8x Stronger than Melatonin. Zero Dependency.',
    benefits: [
      'Falls asleep in <15 min',
      'Non-habit forming',
      'No morning grogginess',
      'FDA-Approved mechanism',
    ],
    bestFor: 'Sleep Onset (trouble falling asleep)',
    color: '#4ECDC4',
  },
  {
    id: 'D1',
    name: 'Formula D1 — Day-Fresh',
    mechanism: 'Daridorexant (DORA — Dual Orexin Receptor Antagonist)',
    tagline: 'Zero Next-Day Grogginess. Performance-Safe.',
    benefits: [
      'Deep restorative sleep',
      'No sedation hangover',
      'No dependency risk',
      'Latest DORA technology',
    ],
    bestFor: 'Sleep Maintenance + Performance',
    color: '#6B8AFF',
  },
];

export type Medication = (typeof medications)[number];
