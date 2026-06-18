import { z } from 'zod';

export const scenarioSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).max(50),
  description: z.string().max(400).optional(),
  score: z.int().optional()
});

export const scenarioDraftSchema = scenarioSchema.partial({ id: true });

export const scenariosListSchema = z.array(scenarioSchema);

export type Scenario = z.infer<typeof scenarioSchema>;
export type ScenariosList = z.infer<typeof scenariosListSchema>;
