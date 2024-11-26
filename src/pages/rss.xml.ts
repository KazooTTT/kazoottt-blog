import { siteConfig } from '@/site-config';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

const sanitizeText = (text: string | undefined) => text?.replace(/[\x00-\x1F\x7F-\x9F]/g, '') || '';

export async function GET(context: APIContext) {
  const postImportResult = import.meta.glob<CollectionEntry<'post'>>('../content/post/**/*.md', { eager: true });
  const posts = Object.values(postImportResult);
  const sortedPosts = posts.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
  
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: sortedPosts.map((post) => {
      const prefix = post.data.category?.startsWith("日记-20") ? '/dairy/' : '/blog/';
      return {
        title: sanitizeText(post.data.title),
        pubDate: new Date(post.data.date),
        description: sanitizeText(post.data.description),
        link: `${prefix}${post.slug}`,
        content: sanitizeHtml(post.body, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt']
          },
          textFilter: sanitizeText
        }),
        author: sanitizeText(post.data.author)
      };
    }),
  });
}
