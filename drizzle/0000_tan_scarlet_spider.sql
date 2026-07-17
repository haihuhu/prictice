CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2),
	"description" varchar(255),
	"created_at" timestamp DEFAULT now()
);
