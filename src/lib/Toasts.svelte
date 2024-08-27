<script>
	import Toast from './Toast.svelte';
	import { toasts } from './toastStore';
	import { slide } from 'svelte/transition';
</script>

<div class="max-w-screen fixed right-2 top-20 flex flex-col gap-2">
	{#each $toasts as toast, i (i)}
		<div transition:slide>
			<Toast color={toast.color} icon={toast.icon} message={toast.message}></Toast>
		</div>
	{/each}
</div>
