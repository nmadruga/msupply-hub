## Adding new Event

* ###### URL

 `/event`

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
    "type": "site",
    "UUID": "{site UUID}", 
}
```

* ###### SAMPLE request

 `/api/v1/event`

JSON Body:

```JSON
 {
     "type": "...", 
     "triggeredDate": "....",
     "moreInfo": "...",
     "moreInfo2": "...",
     "etc..": "..."
 }
 ```

 `NOTE:` type is required and triggeredDate is optional

* ###### ON SUCCESS
  * code:  `200`
  * content:
```JSON
{
    "success": true,
    "message": "event added"
}
```

* ###### ON FAIL
 * code: `401` content: `{ authorisation: false, message: authorization header missing or JWT token is invalid }` 
 * code: `401` content: `{ UUID is not registered }`

* ###### NOTES
 
 On Succesfull post the new event will be added in events table (`siteUUID` will be as per JWT token), event type will be as per `type` field in json body, `triggered` as per `triggeredDate` in json body and all other fields in json body will be in stored in event table's `data` field
 
