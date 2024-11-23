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

	const link = import.meta.env.SITE
	const locale = ''

	const defaultFields = [
		{
			loc: `${link}${locale}`,
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'daily',
			priority: '1.0'
		},
		{
			loc: `${link}${locale}/blog`,
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'daily',
			priority: '0.8'
		},
		{
			loc: `${link}${locale}/categories`,
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'daily',
			priority: '0.7'
		},
		{
			loc: `${link}${locale}/tags`,
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'daily',
			priority: '0.7'
		},
		{
			loc: `${link}${locale}/tools`,
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'weekly',
			priority: '0.6'
		},
		{
			loc: `${link}${locale}/rss.xml`,
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'daily',
			priority: '0.4'
		}
	]

	return rss({
		title: siteConfig.title,
		description: siteConfig.description + '\nfeedId:76245438397618182+userId:62156866798228480',
		site: import.meta.env.SITE,
		items: [...defaultFields, ...items]
	})
}
