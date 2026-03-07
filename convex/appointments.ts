import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    services: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
      })
    ),
    totalPrice: v.number(),
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    vehicleYear: v.optional(v.string()),
    vehicleMake: v.optional(v.string()),
    vehicleModel: v.optional(v.string()),
    vehicleType: v.optional(v.string()),
    preferredDate: v.optional(v.string()),
    preferredTime: v.optional(v.string()),
    address: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("appointments", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
    return id;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("appointments").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("appointments"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const getBookedSlots = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("appointments").collect();
    const booked = all
      .filter(
        (a) =>
          a.preferredDate === args.date &&
          (a.status === "pending" || a.status === "confirmed") &&
          a.preferredTime
      )
      .map((a) => a.preferredTime as string);
    return booked;
  },
});

export const remove = mutation({
  args: { id: v.id("appointments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
