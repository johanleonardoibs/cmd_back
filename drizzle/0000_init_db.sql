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
	"role" "role",
	"user_secret" varchar(256),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
