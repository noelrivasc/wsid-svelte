import type { Actions, PageServerLoad } from './$types';
import {
  loadActions,
  appendAction,
  isOwner,
  isPublic,
  setPublicStatus,
  OwnershipError
} from '$lib/store/decisionRepository';
import { hydrate } from '$lib/engine/reducer';
import { decisionMetadataSchema, factorSchema, scenarioSchema, type Action } from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

export const load: PageServerLoad = async ({ params, locals }) => {
  // NOTE that there's no auth check: loadActions ensures that only
  // public or own decisions are loaded
  const decision = hydrate(await loadActions(params.decisionId, locals.user?.id));
  if (decision === null) throw error(404, 'Decision not found');
  const owner = await isOwner(params.decisionId, locals.user?.id);
  return {
    decisionId: params.decisionId,
    decision,
    readOnly: !owner,
    isPublic: owner ? await isPublic(params.decisionId) : false
  };
};

const now = () => new Date().toISOString();

// Single choke point for mutations: enforces auth + ownership before appending.
async function guardedAppend(locals: App.Locals, decisionId: string, action: Action) {
  if (!locals.user) return fail(401, { error: 'Not authenticated' });
  try {
    await appendAction(decisionId, action, now(), locals.user.id);
    return { ok: true };
  } catch (err) {
    if (err instanceof OwnershipError) return fail(403, { error: 'Forbidden' });
    throw err;
  }
}

const idSchema = z.uuid();
const valueSchema = z.object({
  scenarioId: z.uuid(),
  factorId: z.uuid(),
  value: z.number().nullable()
});

export const actions: Actions = {
  editMetadata: async ({ request, params, locals }) => {
    const data = await request.formData();
    const parsed = decisionMetadataSchema.safeParse({
      title: data.get('title'),
      description: data.get('description') ?? ''
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'metadata/edit',
      version: 1,
      payload: parsed.data
    });
  },

  addFactor: async ({ request, params, locals }) => {
    const data = await request.formData();
    const parsed = factorSchema.extend({ id: z.uuid() }).safeParse({
      id: (data.get('id') as string) || crypto.randomUUID(),
      title: data.get('title'),
      description: data.get('description') || undefined,
      weight: Number(data.get('weight'))
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'factor/add',
      version: 1,
      payload: parsed.data
    });
  },

  editFactor: async ({ request, params, locals }) => {
    const data = await request.formData();
    const parsed = factorSchema.extend({ id: z.uuid() }).safeParse({
      id: data.get('id'),
      title: data.get('title'),
      description: data.get('description') || undefined,
      weight: Number(data.get('weight'))
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'factor/edit',
      version: 1,
      payload: parsed.data
    });
  },

  deleteFactor: async ({ request, params, locals }) => {
    const data = await request.formData();
    const parsed = idSchema.safeParse(data.get('id'));
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'factor/delete',
      version: 1,
      payload: { id: parsed.data }
    });
  },

  addScenario: async ({ request, params, locals }) => {
    const data = await request.formData();
    const parsed = scenarioSchema.extend({ id: z.uuid() }).safeParse({
      id: (data.get('id') as string) || crypto.randomUUID(),
      title: data.get('title'),
      description: data.get('description') || undefined
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'scenario/add',
      version: 1,
      payload: parsed.data
    });
  },

  editScenario: async ({ request, params, locals }) => {
    const data = await request.formData();
    const parsed = scenarioSchema.extend({ id: z.uuid() }).safeParse({
      id: data.get('id'),
      title: data.get('title'),
      description: data.get('description') || undefined
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'scenario/edit',
      version: 1,
      payload: parsed.data
    });
  },

  deleteScenario: async ({ request, params, locals }) => {
    const data = await request.formData();
    const parsed = idSchema.safeParse(data.get('id'));
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'scenario/delete',
      version: 1,
      payload: { id: parsed.data }
    });
  },

  // Plain (non-event-sourced) action: flips the is_public column on the row.
  setPublicStatus: async ({ request, params, locals }) => {
    if (!locals.user) return fail(401, { error: 'Not authenticated' });
    const data = await request.formData();
    const isPublic = data.get('isPublic') === 'on' || data.get('isPublic') === 'true';
    try {
      await setPublicStatus(params.decisionId, isPublic, locals.user.id);
      return { ok: true };
    } catch (err) {
      if (err instanceof OwnershipError) return fail(403, { error: 'Forbidden' });
      throw err;
    }
  },

  setValue: async ({ request, params, locals }) => {
    const data = await request.formData();
    const raw = data.get('value');
    const value = raw === null || raw === '' ? null : Number(raw);
    const parsed = valueSchema.safeParse({
      scenarioId: data.get('scenarioId'),
      factorId: data.get('factorId'),
      value
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    return guardedAppend(locals, params.decisionId, {
      type: 'scenarioFactorValue/set',
      version: 1,
      payload: parsed.data
    });
  }
};
