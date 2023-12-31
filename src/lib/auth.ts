import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/sign-in",
  // },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(token, "- token");
      console.log(user, "- user");
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log(session, "- session");
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
    async signIn({ account, profile }) {
      console.log(account, "- account");
      console.log(profile, "- profile");

      if (!profile?.email) {
        throw new Error("No Profile");
      }

      await prisma.user.upsert({
        where: { email: profile.email },
        create: { email: profile.email, username: profile.name },
        update: { name: profile.name },
      });
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "youremail@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials, "- credentials in auth");
        if (!credentials?.email || !credentials?.password) {
          console.log("values are missing  in auth");
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        console.log(existingUser, "- existing user");

        if (!existingUser) {
          console.log("user is not existed in db");
          return null;
        }

        // We stored the encrypt (hash) password, so we need to match the password using bcrypt
        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );

          console.log(passwordMatch, "- password match");

          if (!passwordMatch) {
            console.log("Incorrect password");
            return null;
          }
        }
        return {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
    // ...add more providers here
  ],
};
