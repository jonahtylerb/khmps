import { json } from '@sveltejs/kit';
import { xata } from '$lib/xata.js';
import { createEmail, sendEmails } from '$lib/mailerSend.js';
import html from '$lib/emails/newUser.html?raw';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
	const { addedUsers, updatedUsers, deletedUsers, newAdmins } = await request.json();
	let operations = [];

	function hash(password: string) {
		return bcrypt.hashSync(password, 10);
	}

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
						password: user?.tempPassword ? hash(user.tempPassword) : user.password
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
						password: user?.tempPassword ? hash(user.tempPassword) : user.password,
						kingdomHall: user.kingdomHall
					}
				}
			}))
		);
	}

	if (newAdmins?.length > 0) {
		const emails = newAdmins.map((user: (typeof newAdmins)[0]) => {
			return createEmail({
				name: user.name,
				sender: 'info@khmps.com',
				subject: 'Welcome to KHMPS!',
				recipient: user.email,
				personalization: {
					email: user.email,
					data: {
						name: user.name,
						email: user.email,
						password: user.tempPassword
					}
				},
				html: html
			});
		});

		sendEmails(emails);
	}

	const response = await xata.transactions.run(operations);

	return json(response);
}
