import {type NewUser, users,} from "../../Domain";
import {db} from "../../Config/DatabaseConnection.ts";

export const registerUser = async (user: NewUser) => {
    return db.insert(users).values(user).returning()
}
