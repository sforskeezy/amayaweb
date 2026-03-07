import { getConvex } from "@/lib/convex";
import { api } from "../../../../convex/_generated/api";

export async function GET() {
  try {
    const client = getConvex();
    const data = await (client as any).query(api.customers.list);
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return Response.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = getConvex();
    const id = await (client as any).mutation(api.customers.addOrUpdate, data);
    return Response.json({ success: true, id });
  } catch (error) {
    console.error("Failed to save customer:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    const client = getConvex();
    await (client as any).mutation(api.customers.update, { id, ...updates });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update customer:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const client = getConvex();
    await (client as any).mutation(api.customers.remove, { id });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
