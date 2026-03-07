import { getConvex } from "@/lib/convex";
import { api } from "../../../../../convex/_generated/api";

export async function POST(request: Request) {
  try {
    const { passcode, action, newPasscode } = await request.json();
    const client = getConvex();

    if (action === "change") {
      const valid = await (client as any).query(api.admin.verifyPasscode, { passcode });
      if (!valid) {
        return Response.json({ success: false, error: "Current passcode is incorrect" }, { status: 401 });
      }
      if (!newPasscode || newPasscode.length < 4) {
        return Response.json({ success: false, error: "New passcode must be at least 4 characters" }, { status: 400 });
      }
      await (client as any).mutation(api.admin.setPasscode, { passcode: newPasscode });
      return Response.json({ success: true });
    }

    const valid = await (client as any).query(api.admin.verifyPasscode, { passcode });
    if (valid) {
      return Response.json({ success: true });
    }
    return Response.json({ success: false, error: "Incorrect passcode" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return Response.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
