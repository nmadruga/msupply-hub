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

export const siteAdded = (res, newJWT) => (
  res.status(401).send({
    authorized: true,
    token: newJWT,
    message: 'site added successfully',
  })
);

