import { json } from '@sveltejs/kit';
import { xata } from '$lib/xata.js';

export async function POST({ request }) {
	const { addedUsers, updatedUsers, deletedUsers } = await request.json();
	let operations = [];

	if (updatedUsers.length) {
		operations.push(
			...updatedUsers.map((user: (typeof updatedUsers)[0]) => ({
				update: {
					table: 'users',
					id: user.id,
					fields: {
						name: user.name,
						email: user.email?.toLowerCase(),
						phone: user.phone,
						cong: user.cong,
						skills: user.skills,
						adminCode: user.adminCode
					}
				}
			}))
		);
	}

	if (deletedUsers.length) {
		operations.push(
			...deletedUsers.map((user: (typeof deletedUsers)[0]) => ({
				delete: {
					table: 'users',
					id: user.id
				}
			}))
		);
	}

	if (addedUsers.length) {
		operations.push(
			...addedUsers.map((user: (typeof addedUsers)[0]) => ({
				insert: {
					table: 'users',
					record: {
						name: user.name,
						email: user.email?.toLowerCase(),
						phone: user.phone,
						cong: user.cong,
						skills: user.skills,
						adminCode: user.adminCode,
						kingdomHall: user.kingdomHall
					}
				}
			}))
		);
	}

	const response = await xata.transactions.run(operations);

	return json(response);
}
