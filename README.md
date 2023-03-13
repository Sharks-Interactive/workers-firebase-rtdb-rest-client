<p align='center'>
  <img src="https://i.imgur.com/7svMXLi.png" />
</p>

![npm version](https://img.shields.io/npm/v/@sharks-interactive/workers-firebase-rtdb-rest-client)
![npm downloads](https://img.shields.io/npm/dm/@sharks-interactive/workers-firebase-rtdb-rest-client)
![npm types](https://img.shields.io/npm/types/@sharks-interactive/workers-firebase-rtdb-rest-client)


# Workers Firebase RTDB Client
**Workers Firebase RTDB** is a [Firebase Realtime Database](https://firebase.google.com/docs/database) client library for use specifically with [Cloudflare Workers](https://developers.cloudflare.com/workers/) written in TypeScript.

## Functionality
- Easily **create, edit, update, and delete** json from your database
- Easy **authentication** with your database and its rules
- Supports **conditional requests**/ETag's
- **Follows Workers guidelines**, such as not mutating global state
- **Thorough documentation** and easy to understand functions 

## Usage:
```
npm i --save @sharks-interactive/workers-firebase-rtdb-rest-client
```

## Quick Examples:
#### Writing Data
```ts
import Database from '@sharks-interactive/workers-firebase-rtdb';

addEventListener('fetch', (event) => {
  const db = new Database({
    databaseUrl: 'https://example-db-default-rtdb.firebaseio.com/',
    authentication: 'bearer ya29.[YOUR-OAUTH-TOKEN-HERE]',
    tokenAuthentication: true,
  });
  event.respondWith(async () => {
    const success = await db.update(
        'user/settings',
        JSON.stringify({theme: 'dark'}),
        true,
        new Headers(), // Optional
    );

    if (success) return new Response('Ok', {status: 200, statusText: 'OK'});
    else return new Response('Something went wrong', {status: 500, statusText: 'Internal Server Error'});
  });
});

```

### Reading Data
```ts
import Database from '@sharks-interactive/workers-firebase-rtdb';

addEventListener('fetch', (event) => {
  const db = new Database({
    databaseUrl: 'https://example-db-default-rtdb.firebaseio.com/',
    authentication: 'bearer ya29.[YOUR-OAUTH-TOKEN-HERE]',
    tokenAuthentication: true,
  });
  event.respondWith(async () => {
    const response = await db.read(
        'user/settings',
        true,
        new Headers(), // Optional
    );

    if (response != '') return new Response(response, {status: 200, statusText: 'OK'});
    else return new Response('Something went wrong', {status: 500, statusText: 'Internal Server Error'});
  });
});

```

## Features:
- **.update()** updates data with a PATCH request
- **.push()** pushes data with a POST request
- **.write()** writes data with a PUT request
- **.read()** reads data with a GET request
- **.delete()** deletes data with a DELETE request
- **.appendGetEtagHeader()** appends to a list of headers the header required to get the ETag of data in the database
- **.appendEtagIfHeader()** appends to a list of headers the header required to submit a conditional ETag request to the database
- **tokenAuthentication** supports OAUTH token authentication as well as Firebase ID authentication

## Options (Required)

| Option | Type | Description |
| ------ | ---- | ----------- |
| databaseUrl | string | A string containing the base URL of your database. It **SHOULD** end in a ``/`` and it **MUST** start with ``https://``. See: https://firebase.google.com/docs/database/rest/start |
| authentication | string | Your authentication information. This should be a OAUTH token if ``tokenAuthentication`` is true, and an ID token if if is false. See: https://firebase.google.com/docs/database/rest/auth |
| tokenAuthentication | boolean | Whether the ``authentication`` string is an OAUTH token or Firebase ID. See: https://firebase.google.com/docs/database/rest/auth

## How it works:
This client library is a simplified layer between your code and the Firebase REST API.
In the background it uses the Workers FETCH API to send HTTP requests to your Database.

**Read the wiki for extra documentation.**
  
Project created and maintained by Sharks Interactive.
  
### Developing:
  - Commit to ``staging`` and pr to ``prod`` for changes

### Code Style:
  - Continious Integration will handle formatting for you
  - Use ESLINT locally to catch errors pre-pr

## Acknowledgements:
**README.MD and general SDK structure, styling, practices etc, modelled after and taken from the excellent [Toucan-JS](https://github.com/robertcepa/toucan-js)**
