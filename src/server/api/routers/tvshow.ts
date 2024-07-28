import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tvshowRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.movies.findMany({
      where: {
        MovieType:"Série"
      }
    });
  }),


});