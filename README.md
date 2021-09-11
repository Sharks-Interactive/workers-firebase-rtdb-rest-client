# Workers Firebase RTDB Client
A Firebase RealTime Database Client library for use specifically with CloudFlare Workers.

# Usage:
### NPM:
``npm i @sharks-interactive/``
### CDN:
#### JSDELIVER:
``https://www.jsdelivr.com/package/npm/@sharks-interactive/``
#### UNPKG:
``https://unpkg.com/@sharks-interactive/``
### GITHUB:
``https://github.com/Sharks-Interactive/``

## How it works:
This client library is a simplified layer between your code and the Firebase REST API.
In the background it uses the Workers FETCH API to send HTTP requests to your Database.

## Functionality
- Easily create, edit, update, and delete json from your database
- Easy authentication with your database and it rules
- Supports conditional requests and ETag's
- Subscribe to data change events
### All in vanilla js with _no_ dependencies and in only **KB [for minified version] 

###### (The four dependencies listed are devDeps)

### Read the wiki for documentation.

## src /
  - Contains the source code

## dist /
  - Contains minified code
  
Project created and maintained by Sharks Interactive.
  
### Developing:
  - Commit to ``staging`` and pr to ``prod`` for changes

### Code Style:
  - camelCase for variables eg: ``var correctUse;``
  - cascalCase for function names eg: ``function correctUse();``
  - Brackets should be on the same line
  - Spaces, not tabs
  - Depending on the situation (readability/line length) single line if statements should be same line eg: ``if (this) doStuff();``
