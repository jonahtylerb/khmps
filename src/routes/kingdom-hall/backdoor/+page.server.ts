import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const id = cookies.get('session');

	if (id !== 'rec_ck2uq4dr8j7goh7l5g1g') redirect(307, '/kingdom-hall');
};