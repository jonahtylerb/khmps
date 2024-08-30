import { createEmail, sendEmail, sendEmails } from '$lib/mailerSend';

import dueEmail from '$lib/emails/task.html?raw';
import overdueEmail from '$lib/emails/overdue.html?raw';
import type { Task } from '$lib/data.js';

export async function POST({ request }) {
	const { hall, overdueTasks, dueTasks } = await request.json();

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const overdueEmails = overdueTasks.map((task: Task) => {
		return createEmail({
			sender: 'info@khmps.com',
			subject: 'Overdue Task For Kingdom Hall Maintenance',
			name: task.assignedTo?.name,
			recipient: task.assignedTo?.email,
			text: '',
			personalization: {
				email: task.assignedTo?.email,
				data: {
					name: task.assignedTo?.name,
					task: task.title,
					due: months[+task.due! - 1],
					id: task.id
				}
			},
			html: overdueEmail
		});
	});

	const dueEmails = dueTasks.map((task: Task) => {
		return createEmail({
			sender: 'info@khmps.com',
			subject: 'Task Due For Kingdom Hall Maintenance',
			name: task.assignedTo?.name,
			recipient: task.assignedTo?.email,
			text: '',
			personalization: {
				email: task.assignedTo?.email,
				data: {
					name: task.assignedTo?.name,
					task: task.title,
					due: months[+task.due! - 1],
					id: task.id
				}
			},
			html: dueEmail
		});
	});

	await sendEmails([...dueEmails, ...overdueEmails]);

	return new Response('OK');
}
