<script>
	import { tasksStore, usersStore, userStore } from '$lib/data';
	let { data, children } = $props();

	tasksStore.set(data.tasks);
	usersStore.set(data.users);
	userStore.set(data.user);
</script>

{@render children()}
