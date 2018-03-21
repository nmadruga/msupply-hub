DROP TABLE IF EXISTS "version";

CREATE TABLE "sites" (
   "UUID" varchar,
   "jwt" varchar,
   "create" TIMESTAMP NOT NULL DEFAULT NOW(),
   "data" jsonb,
   PRIMARY KEY ("UUID")
);
