import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import * as db from "@/lib/db";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

function getConvex() {
  if (!CONVEX_URL) return null;
  return new ConvexHttpClient(CONVEX_URL);
}

export async function GET() {
  try {
    const client = getConvex();
    if (client) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await (client as any).query(api.gallery.list);
      return Response.json(data);
    }
    return Response.json(db.getGalleryImages());
  } catch {
    return Response.json(db.getGalleryImages());
  }
}

export async function POST(request: Request) {
  try {
    const { url: imageUrl, alt } = await request.json();
    const client = getConvex();
    if (client) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (client as any).mutation(api.gallery.add, { url: imageUrl, alt });
    } else {
      db.addGalleryImage(imageUrl, alt);
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to add gallery image:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const client = getConvex();
    if (client) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (client as any).mutation(api.gallery.remove, { id });
    } else {
      db.deleteGalleryImage(id);
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete gallery image:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
