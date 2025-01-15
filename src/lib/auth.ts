import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthClient } from "better-auth/react";

import { BASE_URL } from "./constants";
import db from "@/db";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});

export default auth;
