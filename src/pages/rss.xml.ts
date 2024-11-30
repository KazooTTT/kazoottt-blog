import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it';
import { getSortedAllPostsAndDiaries } from 'src/utils/post';

const parser = new MarkdownIt();
export async function GET(context: APIContext) {
	const blog = await getSortedAllPostsAndDiaries()
	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site!,
		customData: `<follow_challenge>
    <feedId>75113012474671104</feedId>
    <userId>62156866798228480</userId>
</follow_challenge>`,
		items: blog.map((post) => {
			const prefix = post?.data.category?.startsWith('日记-20') ? '/diary/' : '/blog/'
			return {
				title: post.data.title,
				pubDate: new Date(post.data.date),
				description: post.data.description ?? '',
				link: `${prefix}${post.slug}`,
				content: sanitizeHtml(parser.render(post.body), {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
					textFilter: function (text) {
						return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFF0-\uFFFF]/g, '')
					}
				}),
				author: siteConfig.author
			}
		})
	})
}
