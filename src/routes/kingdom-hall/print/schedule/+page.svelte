<script lang="ts">
	import type { Task } from '$lib/data';

	const { data } = $props();

	function due(task: Task, i: number) {
		if (!task.due) return '';

		return task.due?.split('-')?.includes(`${i}`) ? 'bg-#C3D69B' : '';
	}

	function completed(task: Task, i: number) {
		if (!task.completed) return '';

		return task.completed?.split('-')?.includes(`${i}`) ? 'X' : '';
	}
</script>

<h1 class="text-20px text-#243F60 b-b-1px b-#F79646 mb-15px font-black">
	YEARLY MAINTENANCE SCHEDULE
</h1>
<div class="mb-10px gap-20px flex flex-row">
	<h2 class="text-#243F60 font-bold">BUILDING ADDRESS:</h2>
	<input type="text" class="b-b-1px b-primary grow-1" />
	<h2 class="text-#243F60 font-bold">YEAR:</h2>
	<input type="text" class="b-b-1px w-20%" value={new Date().getFullYear()} />
</div>
<table class="mx-auto w-full border-collapse text-left">
	<thead>
		<tr>
			<th class="text-#243F60">TASK</th>
			<th class="text-#243F60">ASSIGNED TO</th>
			<th class="font-500">Jan</th>
			<th class="font-500">Feb</th>
			<th class="font-500">Mar</th>
			<th class="font-500">Apr</th>
			<th class="font-500">May</th>
			<th class="font-500">Jun</th>
			<th class="font-500">Jul</th>
			<th class="font-500">Aug</th>
			<th class="font-500">Sep</th>
			<th class="font-500">Oct</th>
			<th class="font-500">Nov</th>
			<th class="font-500">Dec</th>
		</tr>
	</thead>
	<tbody>
		{#each data.tasks as task}
			<tr>
				<td>{task.title}</td>
				<td>{task.assignedTo?.name}</td>
				{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as i}
					<td class={'text-center font-bold ' + `${due(task, i)}`}>
						{completed(task, i)}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
<p class="mt-10px">
	<span class="text-#243F60 font-bold">NOTE:</span> Volunteers should refer to the appropriate Task
	Instruction Card for additional information. Completion of an assigned task can be indicated by
	placing an <span class="font-bold">"X"</span>
	in the corresponding scheduled month(s). Please see the operating committee or maintenance coordinator
	if you have any questions or need assistance.
</p>
