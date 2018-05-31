# Tables in database mSupplyHub

## Site
UUID and jwt token are generated on mSupplyHub for each new site.
One site represents on mSupply server: satelitte or primary.
There is only 1 entry per site on table Site.

Example of row:

UUID | jwt | created | data
------------ | ------------- | ------------ | -------------
ED7704D48ABA47BDB2D50B08A7488F3A | ... | 2018-05-30 05:41:44.963867 | `{  "OS": "Windows 10", "syncID": "1", "userLicenses": 10, "serverStartDate": "17/08/17", "organisationName": "Sols"}`


## Event
Everything else that is pushed from mSupply server to mSupplyHub is an event.
Event has 3 (or more in the future) different types: info, event & error.

### Basic data 
This event has type **info** and will be sending daily basic data with mSupply information.

Example of row:

 id | siteUUID | created | triggered | type | data
 ------------ | ------------- | ------------ | ------------- | ------------ | -------------
  1 | ED7704D48ABA47BDB2D50B08A7488F3A | 2018-05-31 01:21:18.693712 |           | info | `{"version": "3.85", "expiryDate": "1/01/01", "releaseDate": "23/05/18"}`

### Events 
This event has type **event** and will be sending daily events that are also logged in mSupply.

Example of row:

 id | siteUUID | created | triggered | type | data
 ------------ | ------------- | ------------ | ------------- | ------------ | -------------
  2 | ED7704D48ABA47BDB2D50B08A7488F3A | 2018-05-31 02:25:13.631844 | 2018-05-31 14:16:57 | event | `{"logID": "785A27592A3149CDA8168E3EB6394B1B", "pushed": true, "storeID": "", "tableID": 0, "recordID": "", "eventType": "admin", "description": "4D server shut down"}`

### Errors 
This event has type **error** and will be sending problems that happened and that are also logged mSupply.
Those type of events need to be changed in mSupply to be sent as soon as possible.

Example of row:

 id | siteUUID | created | triggered | type | data
 ------------ | ------------- | ------------ | ------------- | ------------ | -------------
  3 | ED7704D48ABA47BDB2D50B08A7488F3A | 2018-05-31 02:32:58.177207 | 2018-05-31 14:19:09 | error | `{"logID": "7EE061117E2348C8A25C4A68C4142387", "pushed": true, "storeID": "", "tableID": 0, "recordID": "", "eventType": "push", "description": "Some problem with credentials: Sync with hub is disabled"}`
