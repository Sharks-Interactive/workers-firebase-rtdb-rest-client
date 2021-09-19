# Workers Firebase RTDB Client
A Firebase RealTime Database Client library for use specifically with CloudFlare Workers.  
Does not set or mutate global state.

# Usage:
### NPM:
``npm i @sharks-interactive/workers-firebase-rtdb-rest-client``
### CDN:
#### JSDELIVER:
``https://www.jsdelivr.com/package/npm/@sharks-interactive/workers-firebase-rtdb-rest-client``
#### UNPKG:
``https://unpkg.com/@sharks-interactive/workers-firebase-rtdb-rest-client``
### GITHUB:
``https://github.com/Sharks-Interactive/releases``

## How it works:
This client library is a simplified layer between your code and the Firebase REST API.
In the background it uses the Workers FETCH API to send HTTP requests to your Database.

## Functionality
- Easily create, edit, update, and delete json from your database
- Easy authentication with your database and it rules
- Supports conditional requests and ETag's
- Subscribe to data change events
### All in vanilla js with _no_ dependencies and in only **KB [for minified version] 

###### (The dependencies listed are devDeps)

### Read the wiki for documentation.

## src /
  - Contains the source code

## dist /
  - Contains js code
  
Project created and maintained by Sharks Interactive.
  
### Developing:
  - Commit to ``staging`` and pr to ``prod`` for changes

### Code Style:
  - Continious Integration will handle formatting for you
  - Use ESLINT locally to catch errors pre-pr
