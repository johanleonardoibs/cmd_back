DO $$ BEGIN
 CREATE TYPE "public"."citizenIdType" AS ENUM('cc', 'ti', 'pp');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'medic', 'patient');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"surname" varchar(256),
	"email" varchar(256),
	"citizenIdType" "citizenIdType",
	"citizenId" varchar(256),
	"password" varchar(256),
	"role" "role",
	CONSTRAINT "email" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "citizen" ON "users" USING btree ("citizenId","citizenIdType");