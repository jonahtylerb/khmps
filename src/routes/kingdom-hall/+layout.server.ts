import { xata } from '$lib/xata';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../login/$types';

export const load: PageServerLoad = async ({ cookies }) => {
	let user;
	const id = cookies.get('session');

	if (!id) redirect(307, '/login');

	user = await xata.db.users.read(id);

	if (!user) redirect(307, '/login');
};
