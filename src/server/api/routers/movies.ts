import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const moviesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.movies.findMany({
      where: {
        MovieType:"Film"
      }
    });
  }),


});