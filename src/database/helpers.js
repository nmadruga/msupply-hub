export const checkAddNewSite = async (db, UUID, siteInfo, newJWT) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" where "UUID" = $1', [UUID]);
  if (foundCount.count !== '0') return false;

  const insertStatement = 'INSERT INTO "sites" ("UUID", jwt, data) VALUES ($1, $2, $3)';
  await db.none(insertStatement, [UUID, newJWT, siteInfo]);
  return true;
};

export const checkSiteExists = async (db, UUID) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" where "UUID" = $1', [UUID]);
  return foundCount.count !== '0';
};

export const addEvent = async (db, UUID, type, triggerDate, otherInfo) => {
  const insertStatement = 'INSERT into "events" ("siteUUID", "type", "data") VALUES ($1, $2, $3)';
  const insertResult = await db.one(`${insertStatement} RETURNING id`, [UUID, type, otherInfo]);

  if (triggerDate) {
    await db.none('UPDATE "events" set triggered = $1 where id = $2', [
      triggerDate,
      insertResult.id
    ]);
  }
};

export const getEvents = async db => {
  try {
    const events = await db.any('SELECT * FROM "events"');
    return events;
  } catch (e) {
    return [];
  }
};

export const getSites = async db => {
  try {
    const sites = await db.any('SELECT * FROM "sites"');
    return sites;
  } catch (e) {
    return [];
  }
};
