DROP TABLE IF EXISTS "version";

CREATE TABLE "version" (
   id SERIAL,
   "version" varchar,
   "servercode" varchar,
   "text" varchar,
   "timestamp" date,
   PRIMARY KEY (id)
);
