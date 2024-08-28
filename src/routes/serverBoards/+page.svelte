<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	console.log(data);
</script>

<div>
	{#each data.boards as board}
		<div>
			<a href="/boards/{board.id}">{board.title}</a>
		</div>
	{/each}
</div>
