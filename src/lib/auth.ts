import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

import { AUTH_SECRET, BASE_URL } from "./constants";
import db from "@/db";
import { schema } from "@/db/schema";

const auth = betterAuth({
  secret: AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  plugins: [nextCookies()],
});

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  fetchOptions: {
    onError: (ctx) => {
      console.log(ctx.error);
    },
  },
});

export default auth;
