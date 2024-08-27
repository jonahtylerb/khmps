export async function DELETE({ cookies }) {
	cookies.delete('session', { path: '/' });

	if (cookies.get('session') === undefined) {
		return new Response(JSON.stringify({ success: true }));
	}
	return new Response(JSON.stringify({ success: false }));
}
