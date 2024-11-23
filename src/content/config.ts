import { defineCollection, z } from 'astro:content'

function removeDupsAndLowerCase(array: string[] | null) {
	if (!array?.length) return []
	const lowercaseItems = array.map((str) => str.toLowerCase())
	const distinctItems = new Set(lowercaseItems)
	return Array.from(distinctItems)
}

const post = defineCollection({
	type: 'content',
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string().optional().nullable(),
			date: z.union([
				z.string(),
				z.date()
			]).transform((val) => new Date(val)),
			coverImage: z.string().optional(),
			draft: z.boolean().default(false),
			tags: z.union([z.array(z.string()), z.null()]).default([]).transform(removeDupsAndLowerCase),
			ogImage: z.string().optional(),
			category: z.string().optional().nullable(),
			finished: z.boolean().default(false)
		})
})

export const collections = { post }
