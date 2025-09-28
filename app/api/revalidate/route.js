import { revalidateTag } from 'next/cache';

/**
 * API route to revalidate cached data
 * POST /api/revalidate?tag=products
 */
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    
    if (!tag) {
      return Response.json({ error: 'Tag parameter is required' }, { status: 400 });
    }
    
    revalidateTag(tag);
    
    return Response.json({ 
      message: `Cache revalidated for tag: ${tag}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error revalidating cache:', error);
    return Response.json({ error: 'Failed to revalidate cache' }, { status: 500 });
  }
}
