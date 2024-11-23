import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals, request }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Access runtime environment through context
  const ctx = locals as any;
  const env = ctx.env || ctx.runtime?.env;
  
  console.log('Context:', {
    hasEnv: !!ctx.env,
    hasRuntime: !!ctx.runtime,
    envKeys: ctx.env ? Object.keys(ctx.env) : [],
    runtimeEnvKeys: ctx.runtime?.env ? Object.keys(ctx.runtime.env) : []
  });

  const db = env?.DB;
  if (!db) {
    console.error('D1 database not available');
    return new Response(
      JSON.stringify({ 
        error: 'Database not configured',
        context: {
          hasEnv: !!ctx.env,
          hasRuntime: !!ctx.runtime,
          envKeys: ctx.env ? Object.keys(ctx.env) : [],
          runtimeEnvKeys: ctx.runtime?.env ? Object.keys(ctx.runtime.env) : []
        }
      }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get current view count
    const { results } = await db
      .prepare('SELECT views FROM pageviews WHERE slug = ?')
      .bind(slug)
      .all();

    const views = results.length > 0 ? results[0].views : 0;

    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting page views:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get page views',
        details: error instanceof Error ? error.message : String(error)
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
    });
  }
};

export const POST: APIRoute = async ({ params, locals, request }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Access runtime environment through context
  const ctx = locals as any;
  const env = ctx.env || ctx.runtime?.env;
  
  console.log('Context:', {
    hasEnv: !!ctx.env,
    hasRuntime: !!ctx.runtime,
    envKeys: ctx.env ? Object.keys(ctx.env) : [],
    runtimeEnvKeys: ctx.runtime?.env ? Object.keys(ctx.runtime.env) : []
  });

  const db = env?.DB;
  if (!db) {
    console.error('D1 database not available');
    return new Response(
      JSON.stringify({ 
        error: 'Database not configured',
        context: {
          hasEnv: !!ctx.env,
          hasRuntime: !!ctx.runtime,
          envKeys: ctx.env ? Object.keys(ctx.env) : [],
          runtimeEnvKeys: ctx.runtime?.env ? Object.keys(ctx.runtime.env) : []
        }
      }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Insert or update view count
    await db
      .prepare(
        `INSERT INTO pageviews (slug, views) 
         VALUES (?, 1) 
         ON CONFLICT(slug) 
         DO UPDATE SET views = views + 1, 
                       updated_at = CURRENT_TIMESTAMP`
      )
      .bind(slug)
      .run();

    // Get updated view count
    const { results } = await db
      .prepare('SELECT views FROM pageviews WHERE slug = ?')
      .bind(slug)
      .all();

    return new Response(JSON.stringify({ views: results[0].views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating page views:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to update page views',
        details: error instanceof Error ? error.message : String(error)
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
    });
  }
};
