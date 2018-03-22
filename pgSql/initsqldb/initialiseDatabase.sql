DROP TABLE IF EXISTS "version";

CREATE TABLE "sites" (
   "UUID" varchar,
   "jwt" varchar,
   "created" TIMESTAMP NOT NULL DEFAULT NOW(),
   "data" jsonb,
   PRIMARY KEY ("UUID")
);
