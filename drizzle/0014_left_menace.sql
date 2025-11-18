CREATE TABLE "page_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_path" text NOT NULL,
	"content" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "page_content_page_path_unique" UNIQUE("page_path")
);
