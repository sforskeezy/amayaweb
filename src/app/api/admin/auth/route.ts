import * as db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { passcode, action, newPasscode } = await request.json();

    if (action === "change") {
      if (!db.verifyAdminPasscode(passcode)) {
        return Response.json({ success: false, error: "Current passcode is incorrect" }, { status: 401 });
      }
      if (!newPasscode || newPasscode.length < 4) {
        return Response.json({ success: false, error: "New passcode must be at least 4 characters" }, { status: 400 });
      }
      db.setAdminPasscode(newPasscode);
      return Response.json({ success: true });
    }

    if (db.verifyAdminPasscode(passcode)) {
      return Response.json({ success: true });
    }
    return Response.json({ success: false, error: "Incorrect passcode" }, { status: 401 });
  } catch {
    return Response.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
