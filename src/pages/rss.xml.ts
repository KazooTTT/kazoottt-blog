import { siteConfig } from '@/site-config'
import { getAllSortedPosts } from '@/utils'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
	const blog = await getAllSortedPosts()
	return rss({
		// `<title>` field in output xml
		title: siteConfig.title,
		// `<description>` field in output xml
		description: siteConfig.description,
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site!,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description ?? '',
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/blog/${post.slug}/`
		})),
		// Add custom XML elements
		customData: `
		<follow_challenge>
			<feedId>83074007039123456</feedId>
			<userId>62156866798228480</userId>
		</follow_challenge>`
	})
}
