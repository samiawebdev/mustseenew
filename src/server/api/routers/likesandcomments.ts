import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const likesAndCommentsRouter = createTRPCRouter({
    /*  Likes */

    createLike: protectedProcedure
        .input(z.object({ movieId: z.number(), islike: z.boolean().nullable() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.likes.create({

                data: {
                    
                    userId: ctx.session?.user?.id!,
                    movieId: input.movieId,
                    isLike: input.islike
                },
            });
        }),

    getAllLikes: protectedProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany({
            include: {
                Likes: {
                    where: { userId: ctx.session!.user!.id },
                    orderBy: { movieId: 'asc' },
                    include: {
                        Movies: { select: { PosterUrl: true, title: true, MovieType: true } }
                    }
                }
            },
            where:{id: ctx.session!.user!.id}
        });
    }),

    updateLike: protectedProcedure
        .input(z.object({ likeId: z.number(), userId: z.string(), movieId: z.number(), islike: z.boolean() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.likes.update({
                where: { id: input.likeId },
                data: {
                    //   id: input.likeId,
                    userId: input.userId,
                    movieId: input.movieId,
                    isLike: input.islike
                },
            });
        }),

    deleteLike: protectedProcedure
        .input(z.object({ likeId: z.number() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.likes.delete({
                where: { id: input.likeId }
            });
        }),


    /*  Comments */

    createComment: protectedProcedure
        .input(z.object({postId: z.number(), userId: z.string().nullable().optional(), movieId: z.number(), comment: z.string().max(1000).optional(), name: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.post.create({

                data: {
                    // id: input?.id == null ? 0 : input?.id,
                    createdById: input.userId!,
                    movieId: input.movieId,
                    name: input.name,
                    comment: input?.comment!,
                },
            });
        }),

    getAllComments: protectedProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany({
            include: {
                posts: {
                    where: { createdById: ctx.session!.user!.id },
                    orderBy: { movieId: 'asc' },
                    include: {
                        Movies: { select: { PosterUrl: true, title: true, MovieType: true } }
                    }
                },

            }
        });
    }),

    updateComment: protectedProcedure
        .input(z.object({ postId: z.number(), userId: z.string(), movieId: z.number(), comment: z.string().max(1000), name: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.post.update({
                where: { id: input.postId },
                data: {
                    //   id: input.likeId,
                    createdById: input.userId,
                    movieId: input.movieId,
                    comment: input.comment,
                    name: input.name,
                    updatedAt: new Date(Date.now())
                },
            });
        }),

    deleteComment: protectedProcedure
        .input(z.object({ postId: z.number() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.post.delete({
                where: { id: input.postId }
            });
        }),

    /* Likes + Comments list */
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany({
            include: {
                Likes: {
                    where: { userId: ctx.session!.user!.id },
                    orderBy: { movieId: 'asc' },
                    include: {
                        Movies: { select: { PosterUrl: true, title: true, MovieType: true } }
                    }
                },
                posts: {
                    where: { createdById: ctx.session!.user!.id },
                    orderBy: { movieId: 'asc' },
                    include: {
                        Movies: { select: { PosterUrl: true, title: true, MovieType: true } }
                    }
                },

            },
            where:{id: ctx.session!.user!.id}
        });
    }),

});