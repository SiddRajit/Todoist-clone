ALTER TABLE "todos" ADD COLUMN "dueDate" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "priority" varchar DEFAULT 'medium' NOT NULL;