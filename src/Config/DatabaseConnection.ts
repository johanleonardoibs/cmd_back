import {environment} from "./environment.ts";
import {Client} from "pg";
import {drizzle} from "drizzle-orm/node-postgres";

const client = new Client({
    connectionString: environment.APP_DB
})

export default client

export const db = drizzle(client);