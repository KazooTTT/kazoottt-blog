import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

/** Note: this function filters out draft posts based on the environment */
export async function getAllPosts(): Promise<CollectionEntry<'post'>[]> {
	return await getCollection('post', ({ data }: { data: CollectionEntry<'post'> }) => {
		return !data.draft && !data.category?.startsWith('日记-20')
	})
}

export async function getAllSortedPosts(): Promise<CollectionEntry<'post'>[]> {
	return sortMDByDate(await getAllPosts())
}

export const getAllDiaries = async (): Promise<CollectionEntry<'post'>[]> => {
	return await getCollection('post', ({ data }: { data: CollectionEntry<'post'> }) => {
		return !data.draft && data.category?.startsWith('日记-20')
	})
}

export const getAllDiariesSorted = async (): Promise<CollectionEntry<'post'>[]> => {
	return sortMDByDate(await getAllDiaries())
}

export function sortMDByDate(posts: Array<CollectionEntry<'post'>>): CollectionEntry<'post'>[] {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.date).valueOf()
		const bDate = new Date(b.data.date).valueOf()
		return bDate - aDate
	})
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllTags(posts: Array<CollectionEntry<'post'>>): string[] {
	return posts.flatMap((post) => [...(post.data?.tags ?? [])])
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTags(posts: Array<CollectionEntry<'post'>>): string[] {
	return [...new Set(getAllTags(posts))]
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTagsWithCount(
	posts: Array<CollectionEntry<'post'>>
): Array<[string, number]> {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>()
		)
	].sort((a, b) => b[1] - a[1])
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllCategories(posts: Array<CollectionEntry<'post'>>): string[] {
	return posts.map((post) => post.data.category ?? '未分类')
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueCategories(posts: Array<CollectionEntry<'post'>>): string[] {
	return [...new Set(getAllCategories(posts))]
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueCategoriesWithCount(
	posts: Array<CollectionEntry<'post'>>
): Array<[string, number]> {
	return [
		...getAllCategories(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>()
		)
	].sort((a, b) => b[1] - a[1])
}

export function getIdToSlugMap(posts: Array<CollectionEntry<'post'>>): Record<string, string> {
	return posts.reduce(
		(acc, post) => {
			acc[post.id.split('.md')[0]] = post.slug
			return acc
		},
		{} as Record<string, string>
	)
}
