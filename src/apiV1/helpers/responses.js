export const missingAuthHeaderOrJWT = res => (
  res.status(401).send({
    authorized: false,
    message: 'authorization header missing or JWT token is invalid',
  })
);

export const UUIDAlreadyExists = res => (
  res.status(401).send({
    authorized: false,
    message: 'UUID already registered',
  })
);

export const UUIDNotRegistered = res => (
  res.status(401).send({
    authorized: false,
    message: 'UUID is not registered',
  })
);

export const eventAdded = res => (
  res.send({
    success: true,
    message: 'event added',
  })
);
export const siteAdded = (res, newJWT) => (
  res.send({
    authorized: true,
    token: newJWT,
    message: 'site added successfully',
  })
);

