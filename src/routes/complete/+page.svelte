<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	import JsConfetti from 'js-confetti';

	const { data } = $props();

	let confetti: JsConfetti;

	onMount(() => {
		confetti = new JsConfetti();
	});

	let completed = $state(false);

	async function complete() {
		const res = await fetch('/complete', {
			method: 'POST',
			body: JSON.stringify({ id: data.task.id, hall: data.hall }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			console.error(await res.text());
		} else {
			confetti.addConfetti({
				confettiColors: ['#fff7ed', '#fed7aa', '#fb923c', '#ea580c', '#9a3412'],
				confettiNumber: 500,
				confettiRadius: 5
			});
			completed = true;
		}
	}
</script>

<section class="flex-center flex size-full flex-col">
	{#if !completed}
		<div class="flex-center flex flex-col" transition:slide>
			<h1 class="w-100 line-height-10 text-center text-3xl font-bold">
				Mark <span class="underline decoration-orange-500 decoration-4">{data.task?.title}</span> task
				as completed?
			</h1>
			<Button onclick={complete} class="mt-10 font-bold" size="lg">Complete!</Button>
		</div>
	{:else}
		<h1 transition:slide class="w-100 line-height-10 text-center text-3xl font-bold">
			<span class="underline decoration-orange-500 decoration-4">Thank You!</span>
		</h1>
	{/if}
</section>
