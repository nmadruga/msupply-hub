export const checkAddNewSite = async (db, UUID, siteInfo, newJWT) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" WHERE "UUID" = $1', [UUID]);
  if (foundCount.count !== '0') return false;

  const insertStatement = 'INSERT INTO "sites" ("UUID", jwt, data) VALUES ($1, $2, $3)';
  await db.none(insertStatement, [UUID, newJWT, siteInfo]);
  return true;
};

export const checkSiteExists = async (db, UUID) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" WHERE "UUID" = $1', [UUID]);
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

const addStatement = function (whereOrAnd, key, index) {
  return {
    'UUID': ` ${whereOrAnd} "siteUUID" = $${index}`,
    'type': ` ${whereOrAnd} "type" = $${index}`,
    'startDate': ` ${whereOrAnd} "created" > $${index}`, 
    'endDate':` ${whereOrAnd} "created" < $${index}`
  }[key];
}

export const getEvents = async (db, {UUID, type, startDate, endDate}) => {
  const args = {UUID, type, startDate, endDate};
  let queryStatement = 'SELECT * FROM "events"';
  let whereOrAnd = 'WHERE';
  let index = 1;
  Object.entries(args).forEach(([key, value]) => {
    if (value) {
      queryStatement += addStatement(whereOrAnd, key, index);
      whereOrAnd = 'AND';
      index++;
    }
  });

  Object.keys(args).forEach(key => args[key] === undefined ? delete args[key] : '');

  try {
    const events = await db.any(queryStatement, Object.values(args));
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
