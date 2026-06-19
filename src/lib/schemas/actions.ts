import { z } from 'zod';
import { decisionMetadataSchema } from '$lib/schemas/decisionMetadata';
import { factorSchema } from '$lib/schemas/factor';
import { scenarioSchema } from '$lib/schemas/scenario';
import { scenarioFactorValueSchema } from '$lib/schemas/decision';

const v1 = z.literal(1);

export const actionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('metadata/edit'),
    version: v1,
    payload: decisionMetadataSchema
  }),
  z.object({
    type: z.literal('factor/add'),
    version: v1,
    payload: factorSchema
  }),
  z.object({
    type: z.literal('factor/edit'),
    version: v1,
    payload: factorSchema
  }),
  z.object({
    type: z.literal('factor/delete'),
    version: v1,
    payload: z.object({ id: z.uuid() })
  }),
  z.object({
    type: z.literal('scenario/add'),
    version: v1,
    payload: scenarioSchema
  }),
  z.object({
    type: z.literal('scenario/edit'),
    version: v1,
    payload: scenarioSchema
  }),
  z.object({
    type: z.literal('scenario/delete'),
    version: v1,
    payload: z.object({ id: z.uuid() })
  }),
  z.object({
    type: z.literal('scenarioFactorValue/set'),
    version: v1,
    payload: z.object({
      scenarioId: z.uuid(),
      factorId: z.uuid(),
      value: scenarioFactorValueSchema
    })
  }),
  z.object({
    type: z.literal('scenarioFactorValue/setMultiple'),
    version: v1,
    payload: z.object({
      scenarioId: z.uuid(),
      values: z.record(z.uuid(), scenarioFactorValueSchema)
    })
  })
]);

export type Action = z.infer<typeof actionSchema>;
export type ActionType = Action['type'];
