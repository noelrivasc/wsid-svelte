import type { Factor, Factors } from '$lib/schemas';

export const factorIds = {
  salary: '8199397c-9ea0-4c25-92fe-c86e44089183',
  commute: '8646b36f-2fcd-46ca-bf4a-54facdc15a69',
  culture: 'bbae130b-1f40-4484-a612-7ac1b6689899',
  techStack: 'da535cbc-dd11-45e0-b780-853f00a1af3f',
  officeSnacks: 'dd9bd3d9-2a13-4b44-850e-3d44517430ed'
} as const;

export const salaryFactor: Factor = {
  id: factorIds.salary,
  title: 'Salary',
  description: 'Total compensation including bonus and equity.',
  weight: 9
};

export const commuteFactor: Factor = {
  id: factorIds.commute,
  title: 'Commute',
  description: 'Time and stress of getting there each day.',
  weight: 6
};

export const cultureFactor: Factor = {
  id: factorIds.culture,
  title: 'Team culture',
  description: 'How well I gel with the people I work with.',
  weight: 8
};

export const techStackFactor: Factor = {
  id: factorIds.techStack,
  title: 'Tech stack',
  weight: 3
};

export const officeSnacksFactor: Factor = {
  id: factorIds.officeSnacks,
  title: 'Office snacks',
  description: 'Negligible but worth tracking.',
  weight: 0
};

export const coreFactors: Factors = [salaryFactor, commuteFactor, cultureFactor];

export const sampleFactors: Factors = [
  salaryFactor,
  commuteFactor,
  cultureFactor,
  techStackFactor,
  officeSnacksFactor
];

export const singleFactor: Factor = {
  id: 'd7980ff0-3153-4406-b746-8b20f982da54',
  title: 'Just one thing',
  description: 'Only one factor in the list.',
  weight: 5
};

export const formSampleFactor: Factor = {
  id: '2b17d903-a844-4ee7-b950-a0ac8c7ecb70',
  title: 'Salary',
  description: 'Total compensation including bonus and equity.',
  weight: 9
};

export const formMinimalFactor: Factor = {
  id: '64d91db7-9f95-4f00-9426-e479cd479f6d',
  title: 'Tech stack',
  weight: 3
};
