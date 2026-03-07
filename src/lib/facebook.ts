const PAGE_ID = "61576045287455";
const GRAPH_API = "https://graph.facebook.com/v19.0";

type FacebookPhoto = {
  id: string;
  source: string;
  name?: string;
  created_time: string;
};

type FacebookVideo = {
  id: string;
  source: string;
  title?: string;
  description?: string;
  thumbnails?: { data: { uri: string }[] };
  created_time: string;
};

export type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  alt: string;
  createdAt: string;
};

export async function fetchFacebookMedia(
  accessToken: string
): Promise<MediaItem[]> {
  const items: MediaItem[] = [];

  const [photos, videos] = await Promise.allSettled([
    fetchPhotos(accessToken),
    fetchVideos(accessToken),
  ]);

  if (photos.status === "fulfilled") {
    items.push(...photos.value);
  }
  if (videos.status === "fulfilled") {
    items.push(...videos.value);
  }

  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return items;
}

async function fetchPhotos(accessToken: string): Promise<MediaItem[]> {
  const url = `${GRAPH_API}/${PAGE_ID}/photos?fields=source,name,created_time&type=uploaded&limit=50&access_token=${accessToken}`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.data || []).map((p: FacebookPhoto) => ({
    id: `fb-photo-${p.id}`,
    type: "image" as const,
    url: p.source,
    alt: p.name || "Amaya's Auto Detailing",
    createdAt: p.created_time,
  }));
}

async function fetchVideos(accessToken: string): Promise<MediaItem[]> {
  const url = `${GRAPH_API}/${PAGE_ID}/videos?fields=source,title,description,thumbnails,created_time&limit=50&access_token=${accessToken}`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.data || []).map((v: FacebookVideo) => ({
    id: `fb-video-${v.id}`,
    type: "video" as const,
    url: v.source,
    thumbnail: v.thumbnails?.data?.[0]?.uri,
    alt: v.title || v.description || "Amaya's Auto Detailing",
    createdAt: v.created_time,
  }));
}
