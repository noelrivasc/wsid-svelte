import { z } from 'zod';
import { factorsListSchema } from './factor';
import { scenariosListSchema } from './scenario';
import { decisionMetadataSchema } from './decisionMetadata';

// A single value a scenario gets for a factor: integer 0–10, or null when unset.
export const scenarioFactorValueSchema = z.int().min(0).max(10).nullable();

export const scenarioFactorValuesSchema = z.record(
  z.string(), // Keys are scenario ids
  z.record(z.string(), scenarioFactorValueSchema) // values are maps of factor ids to their values { factorId: value }
);

export const decisionSchema = z.object({
  metadata: decisionMetadataSchema,
  factors: factorsListSchema,
  scenarios: scenariosListSchema,
  scenarioFactorValues: scenarioFactorValuesSchema
});

export type ScenarioFactorValue = z.infer<typeof scenarioFactorValueSchema>;
export type ScenarioFactorValues = z.infer<typeof scenarioFactorValuesSchema>;
export type Decision = z.infer<typeof decisionSchema>;
