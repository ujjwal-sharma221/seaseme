import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "@/lib/constants";
import { drizzle } from "drizzle-orm/libsql/web";

import { schema } from "./schema";

const db = drizzle({
  connection: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
  schema,
});

export default db;
