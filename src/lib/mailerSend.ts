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
	personalization?: {
		email: string;
		data: any;
	};
};

export function createEmail({
	sender,
	recipient,
	cc,
	name,
	subject,
	html = '',
	text = '',
	personalization
}: Email): EmailParams {
	const sentFrom = new Sender(sender, 'KHMPS');

	const recipients = [new Recipient(recipient, name)];

	let emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject(subject)
		.setReplyTo(new Sender('khmpsinfo@gmail.com', 'KHMPS'));

	if (cc) emailParams.setCc(cc.map((c) => new Recipient(c)));

	if (personalization) emailParams.setPersonalization([personalization]);

	emailParams.setHtml(html).setText(text);

	return emailParams;
}

export function sendEmail({
	sender,
	recipient,
	cc,
	name,
	subject,
	html = '',
	text = '',
	personalization
}: Email) {
	const emailParams = createEmail({
		sender,
		recipient,
		cc,
		name,
		subject,
		html,
		text,
		personalization
	});

	mailerSend.email
		.send(emailParams)
		.then((response) => console.log(response))
		.catch((error) => console.log(error));
}

export async function sendEmails(emails: EmailParams[]) {
	return await mailerSend.email.sendBulk(emails);
}
