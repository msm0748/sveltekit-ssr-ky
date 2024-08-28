<script lang="ts">
	import { api } from '$lib/api';
	import Cookies from 'js-cookie';

	let email = 'msm0748@gmail.com';
	let password = '1234';
	const onSubmit = async () => {
		const response = await api.post('auth/login', {
			json: {
				email,
				password
			}
		});

		const { accessToken, refreshToken } = await response.json();

		Cookies.set('accessToken', accessToken);
		Cookies.set('refreshToken', refreshToken);
	};
</script>

<div>
	<form on:submit|preventDefault={onSubmit}>
		<label>
			<div>이메일</div>
			<input type="email" bind:value={email} />
		</label>

		<label>
			<div>비밀번호</div>
			<input type="password" bind:value={password} />
		</label>
		<button>로그인</button>
	</form>
</div>
