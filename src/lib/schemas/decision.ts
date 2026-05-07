import { z } from 'zod';
import { factorsListSchema } from './factor';
import { scenariosListSchema } from './scenario';
import { decisionMetadataSchema } from './decisionMetadata';

export const scenarioFactorValuesSchema = z.record(
  z.string(),
  z.record(z.string(), z.number().nullable())
);

export const decisionSchema = z.object({
  metadata: decisionMetadataSchema,
  factors: factorsListSchema,
  scenarios: scenariosListSchema,
  scenarioFactorValues: scenarioFactorValuesSchema
});

export type ScenarioFactorValues = z.infer<typeof scenarioFactorValuesSchema>;
export type Decision = z.infer<typeof decisionSchema>;
