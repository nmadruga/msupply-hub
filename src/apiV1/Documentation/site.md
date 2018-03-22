## Adding new Site

* ###### URL

 `/site/:UUID`

* ###### METHOD

  `POST`

* ###### URL PARAMS

  ```
  no applicable
  ```

* ###### AUTHORISATION

A valid JWT needs to be present in the header:

```
Authorization: Bearer {JWT} 
```

Token payload

```JSON
{
    "type": "init" 
}
```

* ###### SAMPLE request

 `/api/v1/site/ABCD123`

JSON Body:

```JSON
 {
     "siteInfoOne": "...",
     "siteInfoTwo": "....",
     "etc": "..." 
 }
 ```

* ###### ON SUCCESS
  * code:  `200`
  * content:
```JSON
{
    "authorised": true,
    "token": "{newJWT}"
}
```

`newJWT` token will have the following payload:
```JSON
{
  "type": "site",
  "UUID": "ABCD123"
}
```

* ###### ON FAIL
 * code: `401` content: `{ authorisation: false, message: authorization header missing or JWT token is invalid }` 
 * code: `401` content: `{ UUID already registered }`

* ###### NOTES
 
 On Succesfull post the new site will be added to postgresql sites table, with data being data in the post body.
 
