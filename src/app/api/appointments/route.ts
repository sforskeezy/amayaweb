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
      const data = await (client as any).query(api.appointments.list);
      return Response.json(data);
    }
    return Response.json(db.getAppointments());
  } catch {
    return Response.json(db.getAppointments());
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = getConvex();
    if (client) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (client as any).mutation(api.appointments.create, data);
    } else {
      db.addAppointment(data);
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to save appointment:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, appointmentData } = body;

    const client = getConvex();
    try {
      if (client) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (client as any).mutation(api.appointments.updateStatus, { id, status });
      }
    } catch {
      /* Convex may not have this appointment — fall through to local */
    }
    db.updateAppointmentStatus(id, status);

    if (status === "completed" && appointmentData) {
      db.addOrUpdateCustomer({
        name: appointmentData.name,
        phone: appointmentData.phone,
        email: appointmentData.email,
        address: appointmentData.address,
        vehicleYear: appointmentData.vehicleYear,
        vehicleMake: appointmentData.vehicleMake,
        vehicleModel: appointmentData.vehicleModel,
        vehicleType: appointmentData.vehicleType,
        notes: appointmentData.notes,
        totalPrice: appointmentData.totalPrice || 0,
        services: (appointmentData.services || []).map((s: { name: string }) => s.name),
        serviceDate: appointmentData.preferredDate,
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const client = getConvex();
    if (client) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (client as any).mutation(api.appointments.remove, { id });
    } else {
      db.deleteAppointment(id);
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
