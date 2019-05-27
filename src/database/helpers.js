import 'regenerator-runtime/runtime';

export const addEvent = async (db, UUID, type, triggerDate, otherInfo) => {
  const insertStatement = 'INSERT into "events" ("siteUUID", "type", "data") VALUES ($1, $2, $3)';
  const insertResult = await db.one(`${insertStatement} RETURNING id`, [UUID, type, otherInfo]);

  if (triggerDate) {
    await db.none('UPDATE "events" set triggered = $1 where id = $2', [
      triggerDate,
      insertResult.id,
    ]);
  }
};

export const addSiteMachine = async (db, UUID, machineUUID) => {
  const updateStatement = `UPDATE "sites" SET data = jsonb_set(data, '{machineUUID}', '$1') WHERE "UUID" = $2`;

  await db.none(updateStatement, [machineUUID, UUID]);
  return true;
}

const addStatement = function (whereOrAnd, field, { key, value }, index) {
  return {
    site: ` ${whereOrAnd} "siteUUID" = $${index}`,
    type: ` ${whereOrAnd} "type" = $${index}`,
    startDate: ` ${whereOrAnd} "created" > $${index}`,
    endDate: ` ${whereOrAnd} "created" < $${index}`,
  }[field];
};

export const addNewSite = async (db, UUID, siteInfo, newJWT) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" WHERE "UUID" = $1', [UUID]);
  if (foundCount.count !== '0') return false;

  const insertStatement = 'INSERT INTO "sites" ("UUID", jwt, data) VALUES ($1, $2, $3)';
  await db.none(insertStatement, [UUID, newJWT, siteInfo]);
  return true;
};

export const checksSite = async (db, UUID) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" WHERE "UUID" = $1', [UUID]);
  return foundCount.count !== '0';
};

export const checksSiteAndMachine = async (db, UUID, machineUUID) => {
  const foundEntry = await db.one(`SELECT data->>'machineUUID' as machineUUID FROM "sites" WHERE "UUID" = $1`, [UUID]);
  return foundEntry.machineUUID === machineUUID;
}

const concatArgumentFields = function (args) {
  let queryStatement = '';
  let whereOrAnd = 'WHERE';
  let index = 1;

  Object.entries(args).forEach(([key, value]) => {
    // Special case to set key and value in same query statement
    if (key === 'tagKey' && value) {
      const { tagKey, tagValue } = args;
      queryStatement += tagValue
        ? ` ${whereOrAnd} (events.data->>'${tagKey}') ilike '${tagValue}'`
        : ` ${whereOrAnd} (events.data->'${tagKey}') IS NOT NULL`;
      whereOrAnd = 'AND';
    }
    // For other cases of search using single field
    if (key !== 'tagKey' && key !== 'tagValue' && value) {
      queryStatement += addStatement(whereOrAnd, key, value, index);
      whereOrAnd = 'AND';
      index++;
    }
  });

  return queryStatement;
};

export const getEvents = async (db, args) => {
  const queryStatement = 'SELECT * FROM "events"' + concatArgumentFields(args);

  Object.keys(args).forEach(
    key =>
      key === 'tagKey' || key === 'tagValue' || args[key] === undefined ? delete args[key] : ''
  );

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

export const getSiteMachine = async (db, UUID) => {
  try {
    const site = await db.one('SELECT * FROM "sites" WHERE "UUID" = $1', [UUID]);
    return site.data.machineUUID;
  } catch (e) {
    return "";
  }
}

export const getTags = async db => {
  let queryStatement =
    'SELECT key, json_object_agg(value, count) vals FROM (SELECT key, value, count(*) FROM "events", jsonb_each_text(events.data) GROUP BY 1,2 ) s GROUP BY 1';

  try {
    const tags = await db.any(queryStatement);
    return tags;
  } catch (e) {
    return [];
  }
};