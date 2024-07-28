import { z } from "zod";
import { hashSync } from 'bcryptjs';

import { createTRPCRouter, protectedProcedure , publicProcedure} from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        id: ctx.session!.user!.id,
      },
    });
  }),

  create: publicProcedure
    .input(z.object({ username: z.string(), email: z.string().email(), password: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          userName: input.username,
          name: input.username,
          email: input.email,
          password: hashSync(input.password,12)
        },
      });
    }),

    me: protectedProcedure.query(({ ctx }) => {
      return ctx.db.user.findMany({
        where: {
          id: ctx.session!.user!.id,
        },
      });
    })
});