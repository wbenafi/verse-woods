import { query } from "./_generated/server";

export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const lyrics = await ctx.db
      .query("lyrics")
      .withIndex("by_user", (q) => q.eq("createdBy", identity.subject))
      .collect();

    return lyrics.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 6);
  },
});
