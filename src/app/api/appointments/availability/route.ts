import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import * as db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    if (!date) return Response.json({ bookedSlots: [] });

    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (url) {
      const client = new ConvexHttpClient(url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bookedSlots = await (client as any).query(
        api.appointments.getBookedSlots,
        { date }
      );
      return Response.json({ bookedSlots });
    }

    return Response.json({ bookedSlots: db.getBookedSlots(date) });
  } catch {
    return Response.json({ bookedSlots: [] });
  }
}
