import { xata } from '$lib/xata.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const id = cookies.get('session');

	if (id !== 'rec_ck2uq4dr8j7goh7l5g1g') redirect(307, '/kingdom-hall');

	const kingdomHalls = await xata.db.kingdomHalls.getAll();

	const allTasks = kingdomHalls.map(async (kingdomHall) => {
		return {
			kingdomHall: kingdomHall,
			//@ts-ignore
			tasks: await xata.db[kingdomHall.name].select(['*', 'assignedTo.*']).getAll()
		};
	});

	const tasks = await Promise.all(allTasks);

	return { allTasks: tasks };
};
