export const missingAuthHeaderOrJWT = res =>
  res.status(401).send({
    authorized: false,
    message: 'authorization header missing or JWT token is invalid',
  });

export const UUIDAlreadyExists = res =>
  res.status(401).send({
    authorized: false,
    message: 'UUID already registered',
  });

export const UUIDNotRegistered = res =>
  res.status(401).send({
    authorized: false,
    message: 'UUID is not registered',
  });

export const eventAdded = res =>
  res.send({
    success: true,
    message: 'event added',
  });

export const eventsFound = (res, events) =>
  res.send({
    authorized: true,
    message: `Number of events found: ${events.length}`,
    result: events,
  });

export const eventsNotFound = res =>
  res.status(401).send({
    authorized: true,
    message: 'No events found in search',
  });

export const siteAdded = (res, newJWT) =>
  res.send({
    authorized: true,
    token: newJWT,
    message: 'site added successfully',
  });

export const sitesFound = (res, sites) =>
  res.send({
    authorized: true,
    message: `Number of sites found: ${sites.length}`,
    result: sites,
  });

export const sitesNotFound = res =>
  res.status(401).send({
    authorized: true,
    message: 'No sites found in search',
  });
