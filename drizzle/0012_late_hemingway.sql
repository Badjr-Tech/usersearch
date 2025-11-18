CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	CONSTRAINT "pages_name_unique" UNIQUE("name"),
	CONSTRAINT "pages_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE "user_page_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"page_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_page_permissions" ADD CONSTRAINT "user_page_permissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_page_permissions" ADD CONSTRAINT "user_page_permissions_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE no action ON UPDATE no action;