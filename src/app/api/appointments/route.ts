import { getConvex } from "@/lib/convex";
import { api } from "../../../../convex/_generated/api";

export async function GET() {
  try {
    const client = getConvex();
    const data = await (client as any).query(api.appointments.list);
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return Response.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = getConvex();
    await (client as any).mutation(api.appointments.create, data);
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

    await (client as any).mutation(api.appointments.updateStatus, { id, status });

    if (status === "completed" && appointmentData) {
      await (client as any).mutation(api.customers.addOrUpdate, {
        name: appointmentData.name,
        phone: appointmentData.phone,
        email: appointmentData.email || undefined,
        address: appointmentData.address || undefined,
        vehicleYear: appointmentData.vehicleYear || undefined,
        vehicleMake: appointmentData.vehicleMake || undefined,
        vehicleModel: appointmentData.vehicleModel || undefined,
        vehicleType: appointmentData.vehicleType || undefined,
        notes: appointmentData.notes || undefined,
        totalPrice: appointmentData.totalPrice || 0,
        services: (appointmentData.services || []).map((s: { name: string }) => s.name),
        serviceDate: appointmentData.preferredDate || undefined,
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
    await (client as any).mutation(api.appointments.remove, { id });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
