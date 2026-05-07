import { z } from 'zod';

export const decisionMetadataSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().max(5000)
});

export type DecisionMetadata = z.infer<typeof decisionMetadataSchema>;
