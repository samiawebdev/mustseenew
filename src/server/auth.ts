import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";
import { db } from "@/server/db";
import { Usertoroles } from "@prisma/client";

// import { getSession } from "next-auth/react";
// import { randomUUID } from "crypto";
// import { now } from "next-auth/client/_utils";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
      username: string;
      // ...other properties
      role: Usertoroles;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 1 * 60 * 60 // 1 day
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  // cookies: {
      
  // },

  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      ...token,
      user: {
        ...session.user,
        id: token.sub,
        name: token.name,
        role: session.user.role
      },
    }),
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      //else
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    signIn: async ({ user, account }) => {

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }

    }
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // name: "",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      id: "credentials",
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text", placeholder: "" },
        email: { label: "E-mail", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },

      
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const getAppUser = async() => await db.user.findUnique({where: {email : credentials?.email},include:{Usertoroles:true}});

        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        const user = await getAppUser();
       console.log("User sign in: ", user);

  // console.log("Request authorize callback sign in: ", req);
  //        const currentSession = await getSession();
  //        if (currentSession != undefined && currentSession != null) {
  //         "use server"
  //         const newSession = await db.session.create({
  //           data: {userId: currentSession?.user.id, id: randomUUID(), expires: new Date(now())+ currentSession?.expires!, sessionToken: randomUUID()  }   
  //        });
          
  //          console.log("Session written in DB: ", newSession);
          
  //        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })

    // ,DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "http://localhost:3000/assets/svg/mustsee.svg", // Absolute URL to image
    buttonText: "Connexion" // Hex color code
  },
  pages: {
    signIn: '/auth/signin',
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
