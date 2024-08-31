import { xata } from '$lib/xata.js';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	const hall = url.searchParams.get('hall') || '';
	const id = url.searchParams.get('id');

	if (!hall || !id) {
		redirect(307, '/');
	}

	//@ts-ignore
	const task = await xata.db[hall].read(id);

	if (task) {
		return { task, hall };
	}
}
