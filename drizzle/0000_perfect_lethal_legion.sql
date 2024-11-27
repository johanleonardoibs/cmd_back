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
DO $$ BEGIN
 CREATE TYPE "public"."entryType" AS ENUM('work', 'free');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"surname" varchar(256),
	"email" varchar(256) NOT NULL,
	"citizenIdType" "citizenIdType",
	"citizenId" varchar(256),
	"password" varchar(256),
	"role" "role" NOT NULL,
	CONSTRAINT "email" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar_entry" (
	"id" serial PRIMARY KEY NOT NULL,
	"date_start" timestamp NOT NULL,
	"time" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar_period" (
	"id" serial PRIMARY KEY NOT NULL,
	"date_start" date NOT NULL,
	"initial_hour" integer NOT NULL,
	"time" integer NOT NULL,
	"daysOfWeek" varchar NOT NULL,
	"weeks" integer NOT NULL,
	"entryType" "entryType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_to_calendar_entry" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" integer NOT NULL,
	"calendar_entry" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_to_calendar_period" (
	"id" serial PRIMARY KEY NOT NULL,
	"calenda_period" integer NOT NULL,
	"user" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_calendar_entry" ADD CONSTRAINT "user_to_calendar_entry_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_calendar_entry" ADD CONSTRAINT "user_to_calendar_entry_calendar_entry_calendar_entry_id_fk" FOREIGN KEY ("calendar_entry") REFERENCES "public"."calendar_entry"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_calendar_period" ADD CONSTRAINT "user_to_calendar_period_calenda_period_calendar_period_id_fk" FOREIGN KEY ("calenda_period") REFERENCES "public"."calendar_period"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_calendar_period" ADD CONSTRAINT "user_to_calendar_period_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "citizen" ON "users" USING btree ("citizenId","citizenIdType");