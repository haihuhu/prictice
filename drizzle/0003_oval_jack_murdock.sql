ALTER TABLE "projects" ALTER COLUMN "status" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "is_featured";