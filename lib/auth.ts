import { betterAuth } from "better-auth";
import { db } from "@/lib/db";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import {
  user,
  session,
  account,
  verification,
  userRelations,
  sessionRelations,
  accountRelations,
} from "@/lib/db/schemas/auth-schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      userRelations,
      sessionRelations,
      accountRelations,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [admin(), nextCookies()],
  baseURL: process.env.BETTER_AUTH_URL,
});
