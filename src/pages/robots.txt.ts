import type { APIRoute } from 'astro'
import { siteConfig } from '../site.config'

const robotsTxt = `
User-agent: *
Allow: /

HOST: ${siteConfig.site}

# Sitemaps
Sitemap: ${siteConfig.site}/sitemap.xml

# Disallow system and error pages
Disallow: /api/
Disallow: /_astro/
Disallow: /404
Disallow: /500
`

export const GET: APIRoute = () => {
  return new Response(robotsTxt.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
