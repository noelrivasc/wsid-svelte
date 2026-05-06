import { z } from 'zod';
import { factorsListSchema } from './factor';
import { scenariosListSchema } from './scenario';

export const decisionMetadataSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().max(5000)
});

export const scenarioFactorValuesSchema = z.record(
  z.string(),
  z.record(z.string(), z.number().nullable())
);

export const decisionSchema = decisionMetadataSchema.extend({
  factors: factorsListSchema,
  scenarios: scenariosListSchema,
  scenarioFactorValues: scenarioFactorValuesSchema
});

export type DecisionMetadata = z.infer<typeof decisionMetadataSchema>;
export type ScenarioFactorValues = z.infer<typeof scenarioFactorValuesSchema>;
export type Decision = z.infer<typeof decisionSchema>;
