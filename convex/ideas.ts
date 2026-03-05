import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const ideas = await ctx.db
      .query("ideas")
      .withIndex("by_user", (q) => q.eq("createdBy", identity.subject))
      .collect();

    return ideas.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 3);
  },
});

export const getById = query({
  args: { id: v.id("ideas") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const idea = await ctx.db.get(args.id);

    if (!idea || idea.createdBy !== identity.subject) {
      return null;
    }

    return idea;
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();

    const id = await ctx.db.insert("ideas", {
      title: args.title ?? "",
      content: args.content,
      createdBy: identity.subject,
      createdAt: now,
      updatedAt: now,
    });

    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("ideas"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const idea = await ctx.db.get(args.id);

    if (!idea || idea.createdBy !== identity.subject) {
      throw new Error("Idea not found or unauthorized");
    }

    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.title !== undefined) patch.title = args.title;
    if (args.content !== undefined) patch.content = args.content;

    await ctx.db.patch(args.id, patch);
  },
});
