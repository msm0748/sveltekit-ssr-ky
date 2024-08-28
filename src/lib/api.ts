import Cookies from 'js-cookie';
import ky from 'ky';

export const originalApi = ky.create({
	prefixUrl: `http://localhost:8000/api`
});

export const api = originalApi.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				request.headers.set('Authorization', `Bearer ${Cookies.get('accessToken')}`);
			}
		],
		afterResponse: [
			async (request, options, response) => {
				if (response.status === 401) {
					const refreshToken = Cookies.get('refreshToken');
					if (refreshToken) {
						const response = await originalApi.post(`auth/refresh`, {
							headers: {
								Authorization: `Bearer ${refreshToken}`
							}
						});
						const { accessToken } = await response.json();

						Cookies.set('accessToken', accessToken);

						request.headers.set('Authorization', `Bearer ${accessToken}`);
						return ky(request);
					}
				}
			}
		]
	}
});
