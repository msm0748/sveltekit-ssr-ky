import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const response = await locals.api.get('boards');
	const boards = await response.json();

	return {
		boards
	};
};
