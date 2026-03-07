export async function GET() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const hasResend = !!process.env.RESEND_API_KEY;

  let convexOk = false;
  let convexError = "";

  if (convexUrl) {
    try {
      const { ConvexHttpClient } = await import("convex/browser");
      const client = new ConvexHttpClient(convexUrl);
      const { api } = await import("../../../../convex/_generated/api");
      await (client as any).query(api.admin.verifyPasscode, { passcode: "test" });
      convexOk = true;
    } catch (e) {
      convexError = e instanceof Error ? e.message : String(e);
    }
  }

  return Response.json({
    status: "ok",
    env: {
      NEXT_PUBLIC_CONVEX_URL: convexUrl ? `${convexUrl.substring(0, 30)}...` : "NOT SET",
      RESEND_API_KEY: hasResend ? "SET" : "NOT SET",
    },
    convex: { connected: convexOk, error: convexError || undefined },
    runtime: process.env.NETLIFY ? "netlify" : "other",
    nodeVersion: process.version,
  });
}
