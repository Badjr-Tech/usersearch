CREATE TYPE "public"."item_type" AS ENUM('document', 'video');--> statement-breakpoint
CREATE TABLE "library_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"item_type" "item_type" NOT NULL,
	"uploader_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "library_items" ADD CONSTRAINT "library_items_uploader_id_users_id_fk" FOREIGN KEY ("uploader_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;