import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.kazoottt.top',
	output: 'server',
	adapter: cloudflare({
		mode: 'directory',
		runtime: {
			mode: process.env.NODE_ENV === 'production' ? 'off' : 'local',
			persistTo: process.env.NODE_ENV === 'production' ? undefined : '.wrangler/state/v3/d1',
			bindings: {
				DB: {
					type: 'd1',
					databaseName: 'blog-pageviews',
					databaseId: 'ab9e5f7d-e254-4e7d-bd85-5d944a622682'
				}
			}
		}
	}),
	redirects: {
		'/articles': {
			status: 301,
			destination: '/posts'
		},
		'/category': {
			status: 301,
			destination: '/categories'
		},
		'/tag': {
			status: 301,
			destination: '/tags'
		},
		'/about': {
			status: 301,
			destination: '/'
		}
	},
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon({
			include: {
				// Include all icons from the icons directory
				local: './src/icons/*.svg'
			}
		}),
		react()
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow, noopener, noreferrer']
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	prefetch: true
})
