import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const customers = await ctx.db.query("customers").order("desc").collect();
    return customers.sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const getById = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const addOrUpdate = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    vehicleYear: v.optional(v.string()),
    vehicleMake: v.optional(v.string()),
    vehicleModel: v.optional(v.string()),
    vehicleType: v.optional(v.string()),
    notes: v.optional(v.string()),
    totalPrice: v.number(),
    services: v.array(v.string()),
    serviceDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("customers").collect();
    const existing = all.find(
      (c) => c.phone === args.phone || (args.email && c.email === args.email)
    );

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        phone: args.phone,
        ...(args.email && { email: args.email }),
        ...(args.address && { address: args.address }),
        ...(args.vehicleYear && { vehicleYear: args.vehicleYear }),
        ...(args.vehicleMake && { vehicleMake: args.vehicleMake }),
        ...(args.vehicleModel && { vehicleModel: args.vehicleModel }),
        ...(args.vehicleType && { vehicleType: args.vehicleType }),
        totalSpent: existing.totalSpent + args.totalPrice,
        jobCount: existing.jobCount + 1,
        lastServiceDate: args.serviceDate,
        lastServices: args.services,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("customers", {
      name: args.name,
      phone: args.phone,
      email: args.email,
      address: args.address,
      vehicleYear: args.vehicleYear,
      vehicleMake: args.vehicleMake,
      vehicleModel: args.vehicleModel,
      vehicleType: args.vehicleType,
      notes: args.notes,
      totalSpent: args.totalPrice,
      jobCount: 1,
      lastServiceDate: args.serviceDate,
      lastServices: args.services,
      emailsSent: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("customers"),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    vehicleYear: v.optional(v.string()),
    vehicleMake: v.optional(v.string()),
    vehicleModel: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const cleaned: Record<string, string> = {};
    for (const [k, val] of Object.entries(updates)) {
      if (val !== undefined) cleaned[k] = val;
    }
    await ctx.db.patch(id, { ...cleaned, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const incrementEmailsSent = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.id);
    if (customer) {
      await ctx.db.patch(args.id, {
        emailsSent: (customer.emailsSent || 0) + 1,
        updatedAt: Date.now(),
      });
    }
  },
});
