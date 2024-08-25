import { json } from '@sveltejs/kit';
import { xata } from '$lib/xata.js';

export async function POST({ request }) {
	const { addedTasks, updatedTasks, deletedTasks, kingdomHall } = await request.json();
	let operations = [];

	if (updatedTasks.length) {
		operations.push(
			...updatedTasks.map((task: (typeof updatedTasks)[0]) => ({
				update: {
					table: kingdomHall,
					id: task.id,
					fields: {
						title: task.title,
						assignedTo: task.assignedTo?.id,
						due: task.due,
						completed: task.completed
					}
				}
			}))
		);
	}

	if (deletedTasks.length) {
		operations.push(
			...deletedTasks.map((task: (typeof deletedTasks)[0]) => ({
				delete: {
					table: kingdomHall,
					id: task.id
				}
			}))
		);
	}

	if (addedTasks.length) {
		operations.push(
			...addedTasks.map((task: (typeof addedTasks)[0]) => ({
				insert: {
					table: kingdomHall,
					record: {
						title: task.title,
						assignedTo: task.assignedTo?.id,
						due: task.due,
						completed: task.completed,
						sort: +task.id!.split('-')[1]
					}
				}
			}))
		);
	}

	const response = await xata.transactions.run(operations);

	return json(response);
}
