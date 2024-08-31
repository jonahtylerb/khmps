import { xata } from '$lib/xata.js';

export async function POST({ request }) {
	const data = await request.json();

	const user = await xata.db[data.hall].update(data.id, { completed: '0' });

	return new Response('ok');
}
