import { z } from 'zod';
import { factorsListSchema } from './factor';
import { scenariosListSchema } from './scenario';
import { decisionMetadataSchema } from './decisionMetadata';

export const scenarioFactorValuesSchema = z.record(
  z.string(), // Keys are scenario ids
  z.record(z.string(), z.number().nullable()) // values are maps of factor ids to their values { factorId: value }
);

export const decisionSchema = z.object({
  metadata: decisionMetadataSchema,
  factors: factorsListSchema,
  scenarios: scenariosListSchema,
  scenarioFactorValues: scenarioFactorValuesSchema
});

export type ScenarioFactorValues = z.infer<typeof scenarioFactorValuesSchema>;
export type Decision = z.infer<typeof decisionSchema>;
