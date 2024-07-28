import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const swiperSliderRouter = createTRPCRouter({
    listAllTvShowsPosterUrl: publicProcedure.query(({ ctx }) => {
        return ctx.db.movies.findMany({
            where: {
                MovieType: "Série"
            },
            select: {
                PosterUrl:true
            }
        });
    }),
    listAllMoviesPosterUrl: publicProcedure.query(({ ctx }) => {
        return ctx.db.movies.findMany({
            where: {
                MovieType: "Film"
            },
            select: {
                PosterUrl:true
            }
        });
    })


});