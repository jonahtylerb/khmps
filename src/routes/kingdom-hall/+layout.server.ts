import { xata } from '$lib/xata';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../login/$types';

export const load: PageServerLoad = async ({ cookies }) => {
	let user;
	const id = cookies.get('session');

	if (!id) redirect(307, '/login');

	user = await xata.db.users.read(id, ['*', 'kingdomHall.*']);

	if (!user) redirect(307, '/login');

	//@ts-ignore
	const tasks: any = await xata.db[user.kingdomHall?.name].select(['*', 'assignedTo.*']).getAll();

	const users: any = await xata.db.users
		.filter({ 'kingdomHall.id': user.kingdomHall?.id })
		.getAll();

	return {
		user: user,
		tasks: tasks,
		users: users
	};
};
