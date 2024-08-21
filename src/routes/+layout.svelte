<script>
	import '../app.css';
	import 'uno.css';

	import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	const logout = () => {
		document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
		window.location.href = '/login';
	};

	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Navbar fluid={true} style="view-transition-name:nav;" class="fixed left-0 top-0 w-full shadow-lg">
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
		<NavLi href="/about">About</NavLi>
		<NavLi><button onclick={logout} id="logout">Logout</button></NavLi>
	</NavUl>
</Navbar>
<main class="pt-30 flex h-full w-full flex-col items-center px-10 lg:px-20">
	<slot></slot>
</main>
