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

export const siteMacAddressMaching = res =>
  res.send({
    authorized: true,
    message: `Site matches UUID and MAC Address`,
  });

export const siteMacAddressNotMaching = res =>
  res.send({
    authorized: true,
    message: `Site UUID doesn't match MAC Address`,
  });

export const siteUUIDNotFound = res =>
  res.status(401).send({
    authorized: true,
    message: 'No site found with UUID',
  });

export const tagsFound = (res, tags) =>
  res.send({
    authorized: true,
    message: `Number of tags found: ${tags.length}`,
    result: tags,
  });

export const tagsNotFound = res =>
  res.status(401).send({
    authorized: true,
    message: 'No tags found in search',
  });
