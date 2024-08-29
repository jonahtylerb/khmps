<script lang="ts">
	import '../app.css';
	import 'uno.css';
	import '@fontsource/noto-sans';
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Footer,
		FooterBrand,
		FooterCopyright,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';

	import { goto, onNavigate } from '$app/navigation';
	import Toasts from '$lib/Toasts.svelte';

	const { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	async function logout() {
		const res = await fetch('/login', {
			method: 'DELETE'
		});
		if (res.status == 200) {
			goto('/login');
		}
	}
</script>

<Navbar
	fluid={true}
	style="view-transition-name:nav;"
	class="fixed left-0 top-0 z-10 w-full shadow-lg print:hidden"
>
	<NavBrand href="/">
		<img class="m-3 h-8" src="/android-chrome-512x512.png" alt="logo" />
		<span class="text-regular self-center text-2xl">KHMPS</span>
	</NavBrand>

	<DarkMode class="ml-auto"></DarkMode>
	<NavHamburger></NavHamburger>
	<NavUl>
		<NavLi href="/kingdom-hall">Dashboard</NavLi>
		<NavLi href="/kingdom-hall/schedule">Yearly Schedule</NavLi>
		<NavLi href="/kingdom-hall/volunteers">Volunteers</NavLi>
		<NavLi>
			<button onclick={logout} id="logout">Logout</button>
		</NavLi>
	</NavUl>
</Navbar>

<div class="size-0"></div>

<main
	class="pt-30 max-w-screen w-400 print:p-0! flex h-full flex-col items-center px-5 sm:px-10 lg:px-20"
>
	{@render children()}
</main>

<Toasts></Toasts>

<Footer
	style="view-transition-name:footer;"
	footerType="logo"
	class="mt-10 w-full bg-gray-200 print:hidden"
>
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterBrand href="/" src="/android-chrome-192x192.png" alt="KHMPS LOGO" name="KHMPS" />
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center lt-md:my-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="/">Home</FooterLink>
			<FooterLink href="/register">Register</FooterLink>
			<FooterLink href="mailto:khmpsinfo@gmail.com">Contact</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<FooterCopyright href="/" by="KHMPS™" />
</Footer>
