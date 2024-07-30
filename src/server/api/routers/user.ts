import { z } from "zod";
import { hashSync } from 'bcryptjs';

import { createTRPCRouter, protectedProcedure , publicProcedure} from "../trpc";

const idSchema = z.object({ id: z.string() });

const userByAdminSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
});

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  // password: z.string()
});

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
    }),



// Admin section start

//get all users
getAllUsers: protectedProcedure.query(({ ctx }) => {
  return ctx.db.user.findMany();
}),

 //get user by id
 getOne: protectedProcedure
 .input(idSchema)
 .query(({ input, ctx }) => {
   return ctx.db.user.findUnique({
     where: idSchema.parse(input),
   });
 }),

//create user
createUser: protectedProcedure
  .input(z.object({ username: z.string(), email: z.string().email(), password: z.string() }))
  .mutation(({ input, ctx }) => {
    return ctx.db.user.create({
      data: {
        userName: input.username,
        name: input.username,
        email: input.email,
        password: hashSync(input.password,12)
      },
    });
  }),

//update user
updateUser: protectedProcedure
  .input(userUpdateSchema)
  .mutation(({ input, ctx }) => {
    return ctx.db.user.update({
      where: {
        id: input.id.toString(),
      },
      data: userUpdateSchema.parse(input),
    });
  }),

//delete user
deleteUser: protectedProcedure
  .input(idSchema)
  .mutation(({ input, ctx }) => {
    return ctx.db.user.delete({
      where: idSchema.parse(input),
    });
  }),

// Admin section end


});