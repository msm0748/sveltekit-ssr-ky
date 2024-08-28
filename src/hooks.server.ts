import type { Handle } from '@sveltejs/kit';
import ky from 'ky';

export const handle: Handle = async ({ resolve, event }) => {
	const accessToken = event.cookies.get('accessToken');
	const refreshToken = event.cookies.get('refreshToken');

	const originalApi = ky.create({
		prefixUrl: `http://localhost:8000/api`
	});

	const api = originalApi.extend({
		hooks: {
			beforeRequest: [
				(request) => {
					request.headers.set('Authorization', `Bearer ${accessToken}`);
				}
			],
			afterResponse: [
				async (request, options, response) => {
					if (response.status === 401) {
						if (refreshToken) {
							const response = await originalApi.post(`auth/refresh`, {
								headers: {
									Authorization: `Bearer ${refreshToken}`
								}
							});
							const { accessToken } = await response.json();
							event.cookies.set('accessToken', accessToken, { path: '/' });
							request.headers.set('Authorization', `Bearer ${accessToken}`);
							return ky(request);
						}
					}
				}
			]
		}
	});

	event.locals.api = api;
	return await resolve(event);
};
