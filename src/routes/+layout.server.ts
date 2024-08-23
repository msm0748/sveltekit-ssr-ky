import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const response = await locals.api.get('').text();
	console.log('결과값', response);
};
