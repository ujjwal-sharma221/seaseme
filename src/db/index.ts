import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "@/lib/constants";
import { drizzle } from "drizzle-orm/libsql/web";

const db = drizzle({
  connection: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
});

export default db;
