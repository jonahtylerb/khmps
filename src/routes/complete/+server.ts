import { xata } from '$lib/xata.js';

export async function POST({ request }) {
	const data = await request.json();
	const task = data.task;

	let due = task.due.split('-').sort((a: string, b: string) => +a - +b);
	let completed = task.completed.split('-');

	let newCompleted = due.find((month: string) => !completed.includes(month));

	if (newCompleted) {
		completed.push(newCompleted);
	}

	//@ts-ignore
	const updated = await xata.db[data.hall].update(data.task?.id, {
		completed: completed.join('-')
	});

	return new Response('ok');
}
