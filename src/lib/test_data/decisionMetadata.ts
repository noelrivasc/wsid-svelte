import type { DecisionMetadata } from '$lib/schemas';

export const sampleMetadata: DecisionMetadata = {
  title: 'Accept the new job offer',
  description:
    'A senior engineering role at a smaller company. Higher base salary but less equity, and a longer commute. Need to weigh growth, compensation, and lifestyle.'
};

export const minimalMetadata: DecisionMetadata = {
  title: 'Move to Lisbon',
  description: ''
};
