export async function get(req, res) {
	const contents = await req.prisma.blog.findMany({
		select: {
			id: true,
			title: true,
			slug: true
		}
	});

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(contents));
}