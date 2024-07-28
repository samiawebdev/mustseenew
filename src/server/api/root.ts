import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { tvshowRouter } from "./routers/tvshow";
import { moviesRouter } from "./routers/movies";
import { swiperSliderRouter } from "./routers/swiper";
import { likesAndCommentsRouter } from "./routers/likesandcomments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  account: userRouter,
  tvshow: tvshowRouter,
  movie: moviesRouter,
  slider: swiperSliderRouter,
  likesAndComments: likesAndCommentsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
