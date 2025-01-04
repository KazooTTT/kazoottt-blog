import type { CategoryHierarchy } from '@/types'
import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

/** Note: this function filters out draft posts based on the environment */
export async function getAllPosts(): Promise<CollectionEntry<'post'>[]> {
	return await getCollection('post', ({ data }: { data: CollectionEntry<'post'> }) => {
		return !data.draft && !data.category?.startsWith('日记')
	})
}

export async function getAllSortedPosts(): Promise<CollectionEntry<'post'>[]> {
	return sortMDByDate(await getAllPosts())
}

export const getAllDiaries = async (): Promise<CollectionEntry<'post'>[]> => {
	return await getCollection('post', ({ data }: { data: CollectionEntry<'post'> }) => {
		return !data.draft && data.category?.startsWith('日记')
	})
}

export const getAllDiariesSorted = async (): Promise<CollectionEntry<'post'>[]> => {
	return sortMDByDate(await getAllDiaries())
}

export const getSortedAllPostsAndDiaries = async (): Promise<CollectionEntry<'post'>[]> => {
	const posts = await getCollection('post', ({ data }: { data: CollectionEntry<'post'> }) => {
		return !data.draft
	})
	return sortMDByDate(posts)
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

export function getCategoriesGroupByName(
	posts: Array<CollectionEntry<'post'>>
): CategoryHierarchy[] {
	const categories = getUniqueCategoriesWithCount(posts)
	const hierarchicalCategories: CategoryHierarchy[] = []

	categories.forEach(([fullName, count]) => {
		const parts = fullName.split('-')
		let current = hierarchicalCategories

		parts.forEach((part, index) => {
			// If it's the last part, add count
			if (index === parts.length - 1) {
				// Check if category already exists
				let categoryObj = current.find((cat) => cat.category === parts[0])

				if (!categoryObj) {
					categoryObj = {
						category: parts[0],
						fullCategory: parts[0],
						children: {},
						count: 0
					}
					current.push(categoryObj)
				}

				// If it's a nested category
				if (parts.length > 1) {
					if (!categoryObj.children[part]) {
						categoryObj.children[part] = {
							category: part,
							fullCategory: `${categoryObj.fullCategory}-${part}`,
							children: {},
							count
						}
					} else {
						categoryObj.children[part].count = count
					}
				} else {
					// Top-level category
					categoryObj.count = count
				}
			} else {
				// Ensure top-level category exists
				let categoryObj = current.find((cat) => cat.fullCategory === part)
				if (!categoryObj) {
					categoryObj = {
						category: part,
						fullCategory: part,
						children: {},
						count: 0
					}
					current.push(categoryObj)
				}
			}
		})
	})

	// Calculate total count for each category by summing subcategories
	hierarchicalCategories.forEach((category) => {
		if (Object.keys(category.children).length > 0) {
			category.count = Object.values(category.children).reduce(
				(sum, child) => sum + (child.count || 0),
				0
			)
		}
	})

	// Filter out categories with zero count and sort by count
	return hierarchicalCategories
		.filter((category) => category.count > 0)
		.map((category) => ({
			...category,
			children: Object.fromEntries(
				Object.entries(category.children).filter(([_, child]) => child.count > 0)
			)
		}))
		.sort((a, b) => b.count - a.count)
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
