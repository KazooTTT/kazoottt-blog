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

import vercel from '@astrojs/vercel/serverless'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.kazoottt.top',
	redirects: {
		'/articles': '/posts',
		'/articles/[...slug]': '/blogs/[...slug]',
		'/category': '/categories',
		'/category/[...slug]': '/categories/[...slug]',
		'/tag': '/tags',
		'/tag/[...slug]': '/tags/[...slug]',
		'/about': '/'
	},
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon(),
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
	prefetch: true,
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true }
	})
})
