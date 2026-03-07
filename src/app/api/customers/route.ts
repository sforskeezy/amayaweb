import * as db from "@/lib/db";

export async function GET() {
  return Response.json(db.getCustomers());
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const id = db.addOrUpdateCustomer(data);
    return Response.json({ success: true, id });
  } catch (error) {
    console.error("Failed to save customer:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    db.updateCustomer(id, updates);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update customer:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    db.deleteCustomer(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
