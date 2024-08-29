import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

export const mailerSend = new MailerSend({
	apiKey: import.meta.env.VITE_MAILERSEND_API_KEY
});

type Email = {
	sender: string;
	recipient: string;
	cc?: string[];
	name: string;
	subject: string;
	html?: string;
	text?: string;
};

export function sendEmail({ sender, recipient, cc, name, subject, html = '', text = '' }: Email) {
	const sentFrom = new Sender(sender, 'KHMPS');

	const recipients = [new Recipient(recipient, name)];

	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject(subject)
		.setHtml(html)
		.setText(text);

	if (cc) emailParams.setCc(cc.map((c) => new Recipient(c)));

	mailerSend.email
		.send(emailParams)
		.then((response) => console.log(response))
		.catch((error) => console.log(error));
}
