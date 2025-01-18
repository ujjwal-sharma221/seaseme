import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

import { BASE_URL } from "./constants";
import db from "@/db";
import { schema } from "@/db/schema";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [nextCookies()],
});

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});

export default auth;
