import { api } from "../../../../../convex/_generated/api";

const HARDCODED_PASSCODE = "edgaramaya1003";

export async function POST(request: Request) {
  try {
    const { passcode, action, newPasscode } = await request.json();

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (convexUrl) {
      try {
        const { ConvexHttpClient } = await import("convex/browser");
        const client = new ConvexHttpClient(convexUrl);

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
        if (valid) return Response.json({ success: true });
        return Response.json({ success: false, error: "Incorrect passcode" }, { status: 401 });
      } catch (convexError) {
        console.error("Convex auth error, falling back to hardcoded:", convexError);
      }
    }

    if (passcode === HARDCODED_PASSCODE) {
      return Response.json({ success: true });
    }
    return Response.json({ success: false, error: "Incorrect passcode" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return Response.json({
      success: false,
      error: `Server error: ${error instanceof Error ? error.message : "Unknown"}`,
    }, { status: 500 });
  }
}
