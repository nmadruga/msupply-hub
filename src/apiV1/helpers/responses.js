export const missingAuthHeaderOrJWT = res =>
  res.status(401).send({
    authorized: false,
    message: 'Authorization header missing or JWT token is invalid',
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
    message: 'Event added',
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
    message: 'Site added successfully',
  });

export const sitesFound = (res, sites) =>
  res.send({
    authorized: true,
    message: `Number of sites found: ${sites.length}`,
    result: sites,
  });

export const sitesNotFound = res =>
  res.send({
    authorized: true,
    message: 'No sites found in search',
  });

export const siteMachineUUIDMatching = res =>
  res.send({
    authorized: true,
    message: 'Site matches UUID and Machine UUID',
  });

export const siteMachineUUIDNotMatching = res =>
  res.status(406).send({
    authorized: true,
    message: "Site UUID doesn't match Machine UUID",
  });

export const siteUUIDNotFound = res =>
  res.status(406).send({
    authorized: true,
    message: 'No site found with this UUID',
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
