DROP TABLE IF EXISTS "version";

CREATE TABLE "sites" (
   "UUID" varchar,
   "machineUUID" varchar,
   "jwt" varchar,
   "created" TIMESTAMP NOT NULL DEFAULT NOW(),
   "updated" TIMESTAMP,
   "data" jsonb NOT NULL DEFAULT '{}'::json,
   PRIMARY KEY ("UUID")
);

CREATE TABLE "events" (
   id serial,
   "siteUUID" varchar,
   "type" varchar,
   "created" TIMESTAMP NOT NULL DEFAULT NOW(),
   "triggered" TIMESTAMP,
   "data" jsonb NOT NULL DEFAULT '{}'::json,
   PRIMARY KEY (id)
);
