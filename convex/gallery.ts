import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("gallery").collect();
    return images.sort((a, b) => a.order - b.order);
  },
});

export const add = mutation({
  args: {
    url: v.string(),
    alt: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("gallery").collect();
    const maxOrder = existing.length > 0
      ? Math.max(...existing.map((i) => i.order))
      : -1;

    return await ctx.db.insert("gallery", {
      url: args.url,
      alt: args.alt,
      order: maxOrder + 1,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateOrder = mutation({
  args: {
    id: v.id("gallery"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { order: args.newOrder });
  },
});
