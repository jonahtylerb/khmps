import { sendEmail } from '$lib/mailerSend.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		sendEmail({
			sender: 'info@khmps.com',
			recipient: 'jonahtylerb@gmail.com',
			name: 'Jonah Brupbacher',
			subject: 'Someone wants KHMPS!!',
			text: `Email: ${data.get('email')}\nName: ${data.get('name')}\nAddress: ${data.get('address')}\nServing As: ${data.get('servingAs')}`
		});

		return { submitted: true };
	}
};
