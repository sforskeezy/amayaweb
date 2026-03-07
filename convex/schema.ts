import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  appointments: defineTable({
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
    status: v.string(),
    createdAt: v.number(),
  }),

  gallery: defineTable({
    url: v.string(),
    alt: v.string(),
    order: v.number(),
    createdAt: v.number(),
  }),
});
