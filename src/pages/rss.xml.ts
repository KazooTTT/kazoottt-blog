import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import sanitizeHtml from 'sanitize-html'

// Define an interface for your markdown files
interface MarkdownPost {
	frontmatter: {
		title?: string
		date: string
		description?: string
		category?: string
		slug: string
		author?: string
	}
	compiledContent?: () => string
}

export async function GET(context: APIContext) {
	const postImportResult = import.meta.glob('../content/post/**/*.md', { eager: true })
	const posts = Object.values(postImportResult) as MarkdownPost[]
	const sortedPosts = posts.sort(
		(a, b) => new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
	)

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site!,
		customData: `<follow_challenge>
    <feedId>75113012474671104</feedId>
    <userId>62156866798228480</userId>
</follow_challenge>`,
		items: sortedPosts.map((post) => {
			const prefix = post.frontmatter.category?.startsWith('日记-20') ? '/dairy/' : '/blog/'
			return {
				title: post.frontmatter.title?.replace(/[\x00-\x1F\x7F-\x9F]/g, '') ?? '',
				pubDate: new Date(post.frontmatter.date),
				description: post.frontmatter.description?.replace(/[\x00-\x1F\x7F-\x9F]/g, '') ?? '',
				link: `${prefix}${post.frontmatter.slug}`,
				content: sanitizeHtml(post.compiledContent?.() ?? '', {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
					allowedAttributes: {
						...sanitizeHtml.defaults.allowedAttributes,
						img: ['src', 'alt']
					},
					textFilter: (text) => text.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
				}),
				author: post.frontmatter.author?.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
			}
		})
	})
}
