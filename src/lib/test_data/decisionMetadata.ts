import type { DecisionMetadata } from '$lib/schemas';

const longDescription = `I have been going back and forth on whether to stay in my current role or accept a new job offer that landed in my inbox last month. My current position is fully remote, which has reshaped my daily life in ways I value: no commute, lunch at home with my partner, and the flexibility to start early and wrap up in time for evening runs. The downside is that the company is small and the team has barely grown in two years. Promotions are rare, my responsibilities have plateaued, and I worry that another year here could leave my skills and resume looking stale in a fast-moving field.

The new offer comes with a meaningfully higher base salary and a clearer path for advancement, but it would require being in the office four days a week. That means a forty-minute commute each way, less flexibility during the day, and giving up the quiet, focused mornings I have come to rely on. The work itself sounds more challenging and the company is established and growing, so the long-term upside seems stronger. Still, I am unsure whether the bump in pay and ambition is worth trading away a setup that has genuinely improved my quality of life.

The decision comes down to weighing immediate comfort and autonomy against future growth and earning potential. Staying offers stability and a lifestyle I enjoy but risks stagnation; leaving offers momentum and money but costs me time, flexibility, and a routine that works. I have to decide how much I am willing to give up in the short term for the sake of where I might be in three or five years, knowing neither choice is obviously right.`;

export const minimalMetadata: DecisionMetadata = {
  title: 'Move to Lisbon',
  description: ''
};

export const shortMetadata: DecisionMetadata = {
  title: 'Accept the new job offer',
  description: 'I have been going back and forth on whether to stay in my current role or accept a new job offer that landed in my inbox last month. My current position is fully remote, which has reshaped my daily life in ways I value: no commute, lunch at home with my partner, and the flexibility to start early and wrap up in time for evening runs. The downside is that the company is small and the team has barely grown in two years. Promotions are rare, my responsibilities have plateaued, and I worry that another year here could leave my skills and resume looking stale in a fast-moving field.'
};

export const longMetadata: DecisionMetadata = {
  title: 'Accept the new job offer',
  description: longDescription
}

