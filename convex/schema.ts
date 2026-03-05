import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ideas: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    createdBy: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["createdBy"]),
  lyrics: defineTable({
    name: v.string(),
    content: v.optional(v.string()),
    createdBy: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["createdBy"]),
});
