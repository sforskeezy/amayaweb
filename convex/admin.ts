import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_PASSCODE = "edgaramaya1003";

export const getPasscode = query({
  args: {},
  handler: async (ctx) => {
    const config = await ctx.db
      .query("adminConfig")
      .filter((q) => q.eq(q.field("key"), "passcode"))
      .first();
    return config?.value || DEFAULT_PASSCODE;
  },
});

export const verifyPasscode = query({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    const config = await ctx.db
      .query("adminConfig")
      .filter((q) => q.eq(q.field("key"), "passcode"))
      .first();
    const stored = config?.value || DEFAULT_PASSCODE;
    return args.passcode === stored;
  },
});

export const setPasscode = mutation({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    const config = await ctx.db
      .query("adminConfig")
      .filter((q) => q.eq(q.field("key"), "passcode"))
      .first();
    if (config) {
      await ctx.db.patch(config._id, { value: args.passcode });
    } else {
      await ctx.db.insert("adminConfig", { key: "passcode", value: args.passcode });
    }
  },
});
