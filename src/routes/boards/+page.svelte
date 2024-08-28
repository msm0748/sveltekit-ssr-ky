<script lang="ts">
	import { api } from '$lib/api';
	import { onMount } from 'svelte';

	let data = [];

	onMount(async () => {
		const response = await api.get('boards');

		const boards = await response.json();

		data = boards;
	});
</script>

<div>
	{#each data as board}
		<div>
			<a href="/boards/{board.id}">{board.title}</a>
		</div>
	{/each}
</div>
