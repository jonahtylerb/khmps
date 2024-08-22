import { fail, redirect } from '@sveltejs/kit';
import { xata } from '$lib/xata';

export const load = async ({ cookies }) => {
	const id = cookies.get('session');

	if (!id) return;

	const user = await xata.db.users.read(id);

	if (user) redirect(307, '/kingdom-hall');

	return;
};

export const actions = {
	login: async ({ request, cookies }) => {
		let user: any;
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, { email, missing: true });
		}

		user = await xata.db.users.filter('email', email).getFirst();

		if (user.adminCode === `${password.toString()}`) {
			cookies.set('session', user.id, { path: '/' });
			redirect(303, '/kingdom-hall');
		} else {
			return fail(400, { email, incorrect: true });
		}
	}
};
