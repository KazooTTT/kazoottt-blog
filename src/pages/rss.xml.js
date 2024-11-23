import rss from '@astrojs/rss'
import { siteConfig } from '@/site-config'
import { getAllSortedPosts } from '@/utils'

export const GET = async () => {
	const posts = await getAllSortedPosts()

	const items = await Promise.all(
		posts.map(async (post) => {
			const entry = post
			const body = entry.body

			return {
				title: post.data.title ?? '',
				description: JSON.stringify(body),
				pubDate: post.data.date,
				link: `/blog/${post.slug}`
			}
		})
	)

	return rss({
		title: siteConfig.title,
		description: siteConfig.description + '\nfeedId:76245438397618182+userId:62156866798228480',
		site: import.meta.env.SITE,
		items
	})
}
