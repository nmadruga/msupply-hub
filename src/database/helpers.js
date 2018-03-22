export const checkAddNewSite = async (db, UUID, siteInfo, newJWT) => {
  const foundCount = await db.one('SELECT count(*) FROM "sites" where "UUID" = $1', [UUID]);
  if (foundCount.count !== '0') return false;
 
  const insertStatement = 'INSERT INTO "sites" ("UUID", jwt, data) VALUES ($1, $2, $3)';
  await db.none(insertStatement, [UUID, newJWT, siteInfo]);
  return true;
};
