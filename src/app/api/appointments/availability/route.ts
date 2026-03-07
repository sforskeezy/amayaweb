import { getConvex } from "@/lib/convex";
import { api } from "../../../../../convex/_generated/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    if (!date) return Response.json({ bookedSlots: [] });

    const client = getConvex();
    const bookedSlots = await (client as any).query(api.appointments.getBookedSlots, { date });
    return Response.json({ bookedSlots });
  } catch {
    return Response.json({ bookedSlots: [] });
  }
}
