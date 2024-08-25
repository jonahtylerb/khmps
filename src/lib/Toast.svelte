<script>
	import { Toast } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';

	let { icon, message, color } = $props();
</script>

<Toast transition={slide} {color} class="w-100 max-w-screen">
	<svelte:fragment slot="icon">
		<span class={icon}></span>
		<span class="sr-only">icon</span>
	</svelte:fragment>
	{message}
</Toast>
