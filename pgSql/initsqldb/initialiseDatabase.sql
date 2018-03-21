DROP TABLE IF EXISTS "version";

CREATE TABLE "sites" (
   "UUID" varchar,
   "jwt" varchar,
   "created" TIMESTAMP NOT NULL DEFAULT NOW(),
   "data" jsonb,
   PRIMARY KEY ("UUID")
);

CREATE TABLE "events" (
   id serial,
   "siteUUID" varchar,
   "created" TIMESTAMP NOT NULL DEFAULT NOW(),
   "triggered" TIMESTAMP,
   "type" varchar,
   "data" jsonb,
   PRIMARY KEY (id)
);
