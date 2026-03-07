import { getConvex } from "@/lib/convex";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export async function POST(request: Request) {
  try {
    const { customerId, emailType, customSubject, customBody } = await request.json();
    const client = getConvex();
    const customer = await (client as any).query(api.customers.getById, { id: customerId as Id<"customers"> });

    if (!customer) {
      return Response.json({ success: false, error: "Customer not found" }, { status: 404 });
    }
    if (!customer.email) {
      return Response.json({ success: false, error: "Customer has no email on file" }, { status: 400 });
    }

    const firstName = customer.name.split(" ")[0];

    const templates: Record<string, { subject: string; html: string }> = {
      thankyou: {
        subject: "Thank You from Amaya's Auto Detailing!",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #111110; color: #e8e6e1; padding: 40px 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #c9a96e; font-size: 28px; margin: 0;">Amaya's Auto Detailing</h1>
            </div>
            <h2 style="color: #e8e6e1; font-size: 22px;">Thank you, ${firstName}!</h2>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">We truly appreciate your business. It was a pleasure working on your vehicle, and we hope you love the results!</p>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">If you have a moment, we'd love a review on our Facebook page. Your feedback helps us grow!</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.facebook.com/p/Amayas-Auto-Detailing-61576045287455/" style="background: #c9a96e; color: #111110; padding: 12px 28px; text-decoration: none; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">Leave a Review</a>
            </div>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">See you next time!<br/>— The Amaya's Team</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
            <p style="color: #666; font-size: 11px; text-align: center;">Amaya's Mobile Auto Detailing &bull; Professional mobile detailing at your location</p>
          </div>`,
      },
      followup: {
        subject: `${firstName}, time for another detail?`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #111110; color: #e8e6e1; padding: 40px 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #c9a96e; font-size: 28px; margin: 0;">Amaya's Auto Detailing</h1>
            </div>
            <h2 style="color: #e8e6e1; font-size: 22px;">Hey ${firstName}! 👋</h2>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">It's been a while since your last detail. We'd love to get your ride looking pristine again!</p>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">As a returning customer, we want to make sure you're always getting the best service. Book your next appointment and let us take care of the rest.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #c9a96e; color: #111110; padding: 12px 28px; text-decoration: none; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">Book Now</a>
            </div>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">Looking forward to seeing you!<br/>— The Amaya's Team</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
            <p style="color: #666; font-size: 11px; text-align: center;">Amaya's Mobile Auto Detailing &bull; Professional mobile detailing at your location</p>
          </div>`,
      },
      promo: {
        subject: "Special Offer from Amaya's Auto Detailing!",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #111110; color: #e8e6e1; padding: 40px 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #c9a96e; font-size: 28px; margin: 0;">Amaya's Auto Detailing</h1>
            </div>
            <h2 style="color: #e8e6e1; font-size: 22px;">Exclusive Offer for You, ${firstName}!</h2>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">As a valued customer, we're excited to offer you a special deal on your next detail. Get your vehicle looking brand new!</p>
            <div style="text-align: center; margin: 30px 0; padding: 20px; border: 2px dashed #c9a96e; border-radius: 8px;">
              <p style="color: #c9a96e; font-size: 24px; font-weight: bold; margin: 0;">10% OFF</p>
              <p style="color: #a8a29e; font-size: 13px; margin-top: 8px;">Your Next Full Detail</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #c9a96e; color: #111110; padding: 12px 28px; text-decoration: none; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">Claim Offer</a>
            </div>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7;">Don't miss out!<br/>— The Amaya's Team</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
            <p style="color: #666; font-size: 11px; text-align: center;">Amaya's Mobile Auto Detailing &bull; Professional mobile detailing at your location</p>
          </div>`,
      },
      custom: {
        subject: customSubject || "Message from Amaya's Auto Detailing",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #111110; color: #e8e6e1; padding: 40px 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #c9a96e; font-size: 28px; margin: 0;">Amaya's Auto Detailing</h1>
            </div>
            <h2 style="color: #e8e6e1; font-size: 22px;">Hi ${firstName},</h2>
            <div style="color: #a8a29e; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${customBody || ""}</div>
            <p style="color: #a8a29e; font-size: 15px; line-height: 1.7; margin-top: 20px;">— The Amaya's Team</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
            <p style="color: #666; font-size: 11px; text-align: center;">Amaya's Mobile Auto Detailing &bull; Professional mobile detailing at your location</p>
          </div>`,
      },
    };

    const template = templates[emailType] || templates.thankyou;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Amaya's Auto Detailing <onboarding@resend.dev>",
          to: customer.email,
          subject: template.subject,
          html: template.html,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const errMsg = errData?.message || "Failed to send email";
        console.error("Resend error:", errMsg);
        return Response.json({ success: false, error: errMsg }, { status: 500 });
      }
    } else {
      console.log(`[EMAIL] No RESEND_API_KEY set. Simulating email to ${customer.email}`);
    }

    const convex = getConvex();
    await (convex as any).mutation(api.customers.incrementEmailsSent, { id: customerId });

    return Response.json({
      success: true,
      simulated: !RESEND_API_KEY,
      message: RESEND_API_KEY
        ? `Email sent to ${customer.email}`
        : `Email simulated. Add RESEND_API_KEY env var for real delivery.`,
    });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
