import { z } from 'zod';

export const factorSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  weight: z.number().int().min(0).max(10)
});

export const factorDraftSchema = factorSchema.partial({
  id: true
});

export const factorsListSchema = z.array(factorSchema);

export type Factor = z.infer<typeof factorSchema>;
export type Factors = z.infer<typeof factorsListSchema>;
