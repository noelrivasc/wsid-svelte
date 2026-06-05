import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { loadDecisionList } from '$lib/store/decisionRepository';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/users/login');
  return { decisions: await loadDecisionList(locals.user.id) };
};
