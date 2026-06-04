import type { Actions, PageServerLoad } from './$types';
import { createDecision } from '$lib/store/decisionRepository';
import { decisionMetadataSchema } from '$lib/schemas';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/users/login');
};

const now = () => new Date().toISOString();

export const actions: Actions = {
  addDecision: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Not authenticated' });
    const data = await request.formData();
    const parsed = decisionMetadataSchema.safeParse({
      title: data.get('title'),
      description: data.get('description') ?? ''
    });
    if (!parsed.success) return fail(400, { error: parsed.error.message });
    const id = await createDecision(parsed.data, now(), locals.user.id);
    throw redirect(303, `/decisions/${id}`);
  }
};
