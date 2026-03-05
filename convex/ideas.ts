import { query } from "./_generated/server";

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
