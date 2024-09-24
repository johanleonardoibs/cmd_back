import DatabaseConnection from "../Config/DatabaseConnection.ts";
import {db} from "../Config/DatabaseConnection.ts";
import {sql} from "drizzle-orm";
import {type User, users} from "../Domain";

async function createTableIfNotExists() {
    await DatabaseConnection.connect()
    return await db.execute(sql`CREATE TABLE IF NOT EXISTS users ()`);
}

createTableIfNotExists().then((res) => {console.log(res)})