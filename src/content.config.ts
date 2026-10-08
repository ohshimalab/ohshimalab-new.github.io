import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.{md,mdx}',
		// Keep public URLs independent of the year folders used for storage.
		generateId: ({ entry }) => {
			const parts = entry.replace(/\\/g, '/').split('/');
			const filename = parts.pop()!.replace(/\.(md|mdx)$/, '');
			return filename === 'index' ? parts.pop()! : filename;
		},
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { posts };
