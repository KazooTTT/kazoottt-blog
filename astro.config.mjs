import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import remarkUnwrapImages from 'remark-unwrap-images'
import { expressiveCodeOptions } from './src/site.config'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'

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
		'/article': {
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
	prefetch: true,
	vite: {
		optimizeDeps: {
			exclude: ['@resvg/resvg-js']
		},
		plugins: [tailwind(), rawFonts([".ttf", ".woff"])],
	},
})


function rawFonts(ext) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}