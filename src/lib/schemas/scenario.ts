import { z } from 'zod';

export const scenarioSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().min(1).max(50),
  description: z.string().max(400).optional()
});

export const scenariosListSchema = z.array(scenarioSchema);

export type Scenario = z.infer<typeof scenarioSchema>;
export type ScenariosList = z.infer<typeof scenariosListSchema>;
