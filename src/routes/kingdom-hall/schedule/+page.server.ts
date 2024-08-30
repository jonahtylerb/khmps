import { xata } from '$lib/xata';
import type { Actions } from './$types';

export const actions: Actions = {
	addUser: async ({ request }) => {
		const data = await request.formData();

		const newUser = await xata.db.users.create({
			name: data.get('name'),
			email: data.get('email'),
			phone: data.get('phone'),
			cong: data.get('cong'),
			kingdomHall: data.get('kingdomHall')
		});

		return {
			newUser: newUser,
			success: true
		};
	}
};
