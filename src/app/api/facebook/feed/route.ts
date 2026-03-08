const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "d3270b3f54msh3e61d6e58a6afa1p153863jsn646d8df487ce";
const PAGE_ID = "61576045287455";
const CACHE_TTL = 15 * 60 * 1000;

interface CachedData {
  data: FBPost[];
  timestamp: number;
}

export interface FBPost {
  id: string;
  message?: string;
  created_time: string;
  reactions: number;
  comments: number;
  shares: number;
  media?: {
    type: "video" | "photo" | "album";
    thumbnail: string;
    videoUrl?: string;
    url: string;
    title?: string;
  };
}

let cache: CachedData | null = null;

function transformPosts(raw: Record<string, unknown>[]): FBPost[] {
  return raw.map((post) => {
    const attachments = (post.attachments as { data?: Record<string, unknown>[] })?.data || [];
    const att = attachments[0] as Record<string, unknown> | undefined;
    const media = att?.media as { image?: { src: string }; source?: string } | undefined;
    const attType = (att?.type as string) || "";

    let mediaObj: FBPost["media"];
    if (media?.image?.src) {
      const isVideo = attType.includes("video");
      mediaObj = {
        type: isVideo ? "video" : media.source ? "video" : attType === "album" ? "album" : "photo",
        thumbnail: media.image.src,
        videoUrl: isVideo ? (media.source || undefined) : undefined,
        url: (att?.url as string) || "",
        title: (att?.title as string) || undefined,
      };
    }

    return {
      id: post.id as string,
      message: post.message as string | undefined,
      created_time: post.created_time as string,
      reactions: ((post.reactions as { summary?: { total_count?: number } })?.summary?.total_count) || 0,
      comments: ((post.comments as { summary?: { total_count?: number } })?.summary?.total_count) || 0,
      shares: ((post.shares as { count?: number })?.count) || 0,
      media: mediaObj,
    };
  });
}

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return Response.json({ posts: cache.data });
  }

  try {
    const url = new URL(`https://facebook-data-api2.p.rapidapi.com/graph/v19.0/${PAGE_ID}/feed`);
    url.searchParams.set("token_type", "EAAGNO");
    url.searchParams.set("fields", "message,updated_time,created_time,from,comments.summary(total_count),reactions.summary(total_count),shares,attachments");
    url.searchParams.set("limit", "6");
    url.searchParams.set("order", "chronological");

    const res = await fetch(url.toString(), {
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "facebook-data-api2.p.rapidapi.com",
      },
      next: { revalidate: 900 },
    });

    if (!res.ok) throw new Error(`API returned ${res.status}`);

    const json = await res.json();
    const rawPosts = json?.data?.data || [];
    const posts = transformPosts(rawPosts);

    cache = { data: posts, timestamp: Date.now() };
    return Response.json({ posts });
  } catch (error) {
    console.error("Facebook feed API error:", error);
    return Response.json({ posts: cache?.data || [] });
  }
}
