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
