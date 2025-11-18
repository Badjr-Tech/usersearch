ALTER TABLE "pitch_submissions" RENAME TO "event_submissions";--> statement-breakpoint
ALTER TABLE "pitch_competition_events" RENAME TO "events";--> statement-breakpoint
ALTER TABLE "event_submissions" RENAME COLUMN "competition_event_id" TO "event_id";--> statement-breakpoint
ALTER TABLE "event_submissions" RENAME COLUMN "pitch_video_url" TO "video_url";--> statement-breakpoint
ALTER TABLE "event_submissions" RENAME COLUMN "pitch_deck_url" TO "deck_url";--> statement-breakpoint
ALTER TABLE "events" DROP CONSTRAINT "pitch_competition_events_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "event_submissions" DROP CONSTRAINT "pitch_submissions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "event_submissions" DROP CONSTRAINT "pitch_submissions_competition_event_id_pitch_competition_events_id_fk";
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_submissions" ADD CONSTRAINT "event_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_submissions" ADD CONSTRAINT "event_submissions_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;