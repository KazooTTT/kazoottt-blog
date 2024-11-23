import rss from '@astrojs/rss'
import { siteConfig } from '@/site-config'
import { getAllSortedPosts } from '@/utils'

export const GET = async () => {
	const posts = await getAllSortedPosts()

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title ?? '',
			description: `${post.data.description ?? ''}\nfeedId:76245438397618182+userId:62156866798228480`,
			pubDate: post.data.date,
			link: `/blog/${post.slug}`
		}))
	})
}
