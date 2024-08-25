import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

export const mailerSend = new MailerSend({
	apiKey: import.meta.env.VITE_MAILERSEND_API_KEY
});

export function sendEmail(
	sender: string,
	recipient: string,
	name: string,
	subject: string,
	message: string = '',
	text: string = ''
) {
	const sentFrom = new Sender(sender, 'KHMPS');

	const recipients = [new Recipient(recipient, name)];

	// const cc = [
	//   new Recipient("your_cc@client.com", "Your Client CC")
	// ];

	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject(subject)
		.setHtml(message)
		.setText(text);

	mailerSend.email
		.send(emailParams)
		.then((response) => console.log(response))
		.catch((error) => console.log(error));
}
