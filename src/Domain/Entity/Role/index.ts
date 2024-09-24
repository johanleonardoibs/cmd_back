import {pgEnum} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['admin', 'medic', 'patient'])

export enum Role {
    Admin = 'admin',
    Medic = 'medic',
    Patient = 'patient'
}
