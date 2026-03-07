import { getConvex } from "@/lib/convex";
import { api } from "../../../../convex/_generated/api";

export async function GET() {
  try {
    const client = getConvex();
    const data = await (client as any).query(api.gallery.list);
    return Response.json(data);
  } catch {
    return Response.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const { url: imageUrl, alt } = await request.json();
    const client = getConvex();
    await (client as any).mutation(api.gallery.add, { url: imageUrl, alt });
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
    await (client as any).mutation(api.gallery.remove, { id });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete gallery image:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
