<script>
	import Toast from './Toast.svelte';
	import { toasts } from './toastStore';
</script>

<div class="fixed right-2 top-20 flex flex-col gap-2">
	{#each $toasts as toast, i (i)}
		<Toast color={toast.color} icon={toast.icon} message={toast.message}></Toast>
	{/each}
</div>
