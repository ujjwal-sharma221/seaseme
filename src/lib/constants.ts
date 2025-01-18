export const DATABASE_URL = process.env
  .NEXT_PUBLIC_TURSO_DATABASE_URL as string;
export const DATABASE_AUTH_TOKEN = process.env
  .NEXT_PUBLIC_TURSO_AUTH_TOKEN as string;

export const AUTH_SECRET = process.env.BETTER_AUTH_SECRET as string;
export const BASE_URL = process.env.BETTER_AUTH_URL as string;
