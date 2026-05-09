import type { PageServerLoad } from './$types';
import { loadDecisionList } from '$lib/store';

export const load: PageServerLoad = async () => {
  return { decisions: await loadDecisionList() };
};

