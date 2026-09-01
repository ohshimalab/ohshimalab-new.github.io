import { getCollection } from 'astro:content';

export async function getVisiblePosts() {
	const posts = await getCollection('posts', (post) => {
		const isTemplate = post.id.startsWith('_');
		const isVisibleInCurrentMode = import.meta.env.DEV || !post.data.draft;
		return !isTemplate && isVisibleInCurrentMode;
	});

	return posts.sort(
		(a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
	);
}
