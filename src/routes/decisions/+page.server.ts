import type { PageServerLoad } from './$types';
import { loadDecisionList } from '$lib/store/decisionRepository';

export const load: PageServerLoad = async () => {
  return { decisions: await loadDecisionList() };
};

