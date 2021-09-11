# Simple Components
A small, vanilla JS library for easily replicating controls/components.

# Usage:
### NPM:
``npm i @sharks-interactive/simple-components``
### CDN:
#### JSDELIVER:
``https://www.jsdelivr.com/package/npm/@sharks-interactive/simple-components``
#### UNPKG:
``https://unpkg.com/@sharks-interactive/simple-components@1.1.3/dist/simple-components.min.js``
### GITHUB:
``https://github.com/Sharks-Interactive/Simple-Components/releases/download/1.1.3/simple-components.min.js``

## How it works:
Simple components loads components from individual html files and replicates them as many times as specified.
EG: A settings page with multiple text + radio button groups. 
Make the label and radion button in a component.html file
Call simple comps to render x number of them with specific data.

## Functionality
- Custom component data
- Conditional rendering of child elements
- Easy replication of repeated HTML
### All in vanilla js with _no_ dependencies and in only 1KB [for minified version] 

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
