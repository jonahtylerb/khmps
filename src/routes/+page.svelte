<script>
	import { Banner, Button, Heading, P } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
</script>

<Banner
	id="default-banner"
	transition={slide}
	classDiv="!bg-gray-500/50 top-20"
	classInner="flex-col"
	position="absolute"
	dismissable={false}
>
	<p class="flex items-center font-bold">Welcome to the new KHMPS!</p>
	<p class="text-sm">
		You can still use the old one for a time <a
			href="https://khmps.netlify.app"
			class="underline decoration-orange-500 decoration-2">here</a
		>
	</p>
</Banner>

<main class="max-w-90ch mt-15 space-y-5">
	<Heading tag="h1" class="lt-sm:text-4xl mb-10"
		>Kingdom Hall <span class="decoration-blue-5 decoration-5 underline">Maintenance Program</span> Support</Heading
	>
	<P>
		Welcome! This website was designed to help you track Maintenance Tasks in the Maintenance
		Program at your Kingdom Hall.
	</P>
	<P>
		After you login, please proceed to the 'Volunteers' tab and add your volunteers. Then proceed to
		the 'Yearly Schedule' tab and complete your yearly schedule by adding volunteers, you can also
		change the months by clicking on the squares The program will then send the volunteers their
		task card assignment and remind them when their task is due. You will then be able to track any
		completed and overdue tasks. It's that simple!
	</P>
	<Heading tag="h2" class="font-regular decoration-orange-5 decoration-3 text-lg underline"
		>Login to get started!</Heading
	>
	<Button href="/login" class="text-md">Login</Button>
	<section class="mt-10">
		<P class="mb-5">
			If you do not have a login and would like an account, please request access here:
		</P>
		<Button class="mr-2" href="/register">Register</Button>
		<Button color="dark" href="mailto:khmpsinfo@gmail.com">Contact</Button>
	</section>
</main>
