<script lang="ts">
	import { Toast, type ColorVariant } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';

	type Props = { icon: string; message: string; color: ColorVariant };

	let { icon, message, color }: Props = $props();
</script>

<Toast transition={slide} {color} class="w-100 rounded-2 b-1 b-white/10 max-w-full">
	<svelte:fragment slot="icon">
		<span class={icon}></span>
		<span class="sr-only">icon</span>
	</svelte:fragment>
	{message}
</Toast>
