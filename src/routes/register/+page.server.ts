import { sendEmail } from '$lib/mailerSend.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		sendEmail(
			'khmps.com',
			'jonahtylerb@gmail.com',
			`${data.get('name')}`,
			'Sup',
			`Hi my name is ${data.get('name')} I would like to use this app my email is ${data.get('email')} my address is ${data.get('address')} I am serving as ${data.get('servingAs')}`,
			'How are you?'
		);
	}
};
