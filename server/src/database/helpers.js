export const addNewEvent = async (db, UUID, type, triggerDate, otherInfo) => {
  const insertStatement = 'INSERT into "events" ("siteUUID", "type", "data") VALUES ($1, $2, $3)';
  const insertResult = await db.one(`${insertStatement} RETURNING id`, [UUID, type, otherInfo]);
  const { id } = insertResult;
  if (triggerDate) await db.none('UPDATE "events" set triggered = $1 WHERE id = $2', [triggerDate, id]);
};

export const addNewSite = async (db, UUID, machineUUID, newJWT) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" WHERE "UUID" = $1', [UUID]);
  const { count } = foundCount;

  if (count !== '0') return false;

  const insertStatement = 'INSERT INTO "sites" ("UUID", "machineUUID", "jwt") VALUES ($1, $2, $3)';
  await db.none(insertStatement, [UUID, machineUUID, newJWT]);
  return true;
};

export const addSiteInfo = async (db, UUID, info) => {
  const foundSite = await db.one('SELECT * FROM "sites" WHERE "UUID" = $1', [UUID]);

  if (!foundSite) return false;

  const updateStatement = 'UPDATE "sites" SET data = data || $1 WHERE "UUID" = $2';
  await db.none(updateStatement, [info, UUID]);
  return true;
};

export const addSiteMachine = async (db, UUID, machineUUID) => {
  const updateStatement = 'UPDATE "sites" SET "machineUUID" = $1 AND updated = $2 WHERE "UUID" = $3';
  await db.none(updateStatement, [machineUUID, Date.now(), UUID]);
  return true;
};

const addStatement = (whereOrAnd, field, index) => {
  const statements = {
    site: ` ${whereOrAnd} "siteUUID" = $${index}`,
    type: ` ${whereOrAnd} "type" = $${index}`,
    startDate: ` ${whereOrAnd} "created" > $${index}`,
    endDate: ` ${whereOrAnd} "created" < $${index}`,
  };
  return statements[field];
};

export const checkSite = async (db, UUID) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" WHERE "UUID" = $1', [UUID]);
  const { count } = foundCount;
  return count !== '0';
};

export const checkSiteAndMachine = async (db, UUID, machineUUID) => {
  const foundEntry = await db.one('SELECT "machineUUID" FROM "sites" WHERE "UUID" = $1', [UUID]);
  const { machineUUID: entryMachineUUID } = foundEntry;
  return entryMachineUUID === machineUUID;
};

const concatArgumentFields = args => {
  let queryStatement = '';
  let whereOrAnd = 'WHERE';
  let index = 1;

  Object.entries(args).forEach(([key, value]) => {
    // Special case to set key and value in same query statement.
    if (key === 'tagKey' && value) {
      const { tagKey, tagValue } = args;
      queryStatement += tagValue
        ? ` ${whereOrAnd} (events.data->>'${tagKey}') ilike '${tagValue}'`
        : ` ${whereOrAnd} (events.data->'${tagKey}') IS NOT NULL`;
      whereOrAnd = 'AND';
    }
    // For other cases of searching single field.
    if (key !== 'tagKey' && key !== 'tagValue' && value) {
      queryStatement += addStatement(whereOrAnd, key, index);
      whereOrAnd = 'AND';
      index += 1;
    }
  });

  return queryStatement;
};

export const getEvents = async (db, args) => {
  const queryStatement = `SELECT * FROM "events"${concatArgumentFields(args)}`;

  const queryValues = Object.entries(args).reduce((values, [key, value]) => {
    if (key === 'tagKey' || key === 'tagValue' || value === undefined) {
      return values;
    } return values.concat([value]);
  }, []);

  try {
    const events = await db.any(queryStatement, queryValues);
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

export const getSiteMachine = async (db, UUID) => {
  try {
    const site = await db.one('SELECT * FROM "sites" WHERE "UUID" = $1', [UUID]);
    return site.machineUUID;
  } catch (e) {
    return '';
  }
};

export const getTags = async db => {
  const queryStatement =
    'SELECT key, json_object_agg(value, count) vals FROM (SELECT key, value, count(*) FROM "events", jsonb_each_text(events.data) GROUP BY 1,2 ) s GROUP BY 1';

  try {
    const tags = await db.any(queryStatement);
    return tags;
  } catch (e) {
    return [];
  }
};
