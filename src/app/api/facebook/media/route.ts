import { fetchFacebookMedia, type MediaItem } from "@/lib/facebook";

let cache: { data: MediaItem[]; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!token) {
    return Response.json([]);
  }

  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return Response.json(cache.data);
  }

  try {
    const media = await fetchFacebookMedia(token);
    cache = { data: media, timestamp: Date.now() };
    return Response.json(media);
  } catch (error) {
    console.error("Facebook API error:", error);
    return Response.json(cache?.data || []);
  }
}
