import type { Actions, PageServerLoad } from './$types';
import { loadActions, appendAction } from '$lib/store/decisionRepository';
import { hydrate } from '$lib/engine/reducer';
import {
  decisionMetadataSchema,
  factorSchema,
  scenarioSchema
} from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

export const load: PageServerLoad = async ({ params }) => {
  const decision = hydrate(await loadActions(params.decisionId));
  if (decision === null) throw error(404, 'Decision not found');
  return { decisionId: params.decisionId, decision };
};

const now = () => new Date().toISOString();

const idSchema = z.uuid();
const valueSchema = z.object({
  scenarioId: z.uuid(),
  factorId: z.uuid(),
  value: z.number().nullable()
});

export const actions: Actions = {
  editMetadata: async ({ request, params }) => {
    const data = await request.formData();
    const parsed = decisionMetadataSchema.safeParse({
      title: data.get('title'),
      description: data.get('description') ?? ''
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'metadata/edit', version: 1, payload: parsed.data },
      now()
    );
    return { ok: true };
  },

  addFactor: async ({ request, params }) => {
    const data = await request.formData();
    const parsed = factorSchema.extend({ id: z.uuid() }).safeParse({
      id: (data.get('id') as string) || crypto.randomUUID(),
      title: data.get('title'),
      description: data.get('description') || undefined,
      weight: Number(data.get('weight'))
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'factor/add', version: 1, payload: parsed.data },
      now()
    );
    return { ok: true };
  },

  editFactor: async ({ request, params }) => {
    const data = await request.formData();
    const parsed = factorSchema.extend({ id: z.uuid() }).safeParse({
      id: data.get('id'),
      title: data.get('title'),
      description: data.get('description') || undefined,
      weight: Number(data.get('weight'))
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'factor/edit', version: 1, payload: parsed.data },
      now()
    );
    return { ok: true };
  },

  deleteFactor: async ({ request, params }) => {
    const data = await request.formData();
    const parsed = idSchema.safeParse(data.get('id'));
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'factor/delete', version: 1, payload: { id: parsed.data } },
      now()
    );
    return { ok: true };
  },

  addScenario: async ({ request, params }) => {
    const data = await request.formData();
    const parsed = scenarioSchema.extend({ id: z.uuid() }).safeParse({
      id: (data.get('id') as string) || crypto.randomUUID(),
      title: data.get('title'),
      description: data.get('description') || undefined
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'scenario/add', version: 1, payload: parsed.data },
      now()
    );
    return { ok: true };
  },

  editScenario: async ({ request, params }) => {
    const data = await request.formData();
    const parsed = scenarioSchema.extend({ id: z.uuid() }).safeParse({
      id: data.get('id'),
      title: data.get('title'),
      description: data.get('description') || undefined
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'scenario/edit', version: 1, payload: parsed.data },
      now()
    );
    return { ok: true };
  },

  deleteScenario: async ({ request, params }) => {
    const data = await request.formData();
    const parsed = idSchema.safeParse(data.get('id'));
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'scenario/delete', version: 1, payload: { id: parsed.data } },
      now()
    );
    return { ok: true };
  },

  setValue: async ({ request, params }) => {
    const data = await request.formData();
    const raw = data.get('value');
    const value = raw === null || raw === '' ? null : Number(raw);
    const parsed = valueSchema.safeParse({
      scenarioId: data.get('scenarioId'),
      factorId: data.get('factorId'),
      value
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    await appendAction(
      params.decisionId,
      { type: 'scenarioFactorValue/set', version: 1, payload: parsed.data },
      now()
    );
    return { ok: true };
  }
};
