<script lang="ts">
	const { data } = $props();
</script>

<h1 class="text-20px text-#243F60 b-b-1px b-#F79646 mb-15px font-black">VOLUNTEER LIST</h1>
<div class="mb-10px gap-20px flex flex-row">
	<h2 class="text-#243F60 font-bold">BUILDING ADDRESS:</h2>
	<input type="text" class="b-b-1px b-primary grow-1" />
	<h2 class="text-#243F60 font-bold">YEAR:</h2>
	<input type="text" class="b-b-1px w-20%" value={new Date().getFullYear()} />
</div>
<table class="mx-auto w-full border-collapse text-left">
	<thead>
		<tr>
			<th class="text-#243F60">NAME</th>
			<th class="text-#243F60">EMAIL</th>
			<th class="text-#243F60">PHONE</th>
			<th class="text-#243F60">CONG</th>
		</tr>
	</thead>
	<tbody>
		{#each data.users as user}
			<tr>
				<td>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.phone}</td>
				<td>{user.cong}</td>
			</tr>
		{/each}
	</tbody>
</table>
