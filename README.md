# Project Name

> Surveyor

## Team

  - Alexander Schnapp
  - Padma Govindarajalu
  - David Oh

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage
1. Drag and drop resume to search.
2. Click 'save' to save this search
3. Next time you visit the site it will automatically render the results from the previous search
4. To do a new search, just drag and drop a new resume

## Requirements

- Node 8.1.2
- Postgresql 9.1.x
- Yarn
- IBM Watson Document converter
- IBM Watson Natural Language Understanding
- Indeed publisher API
- React Facebook Login
- GeoIp (node module)

## Development
```sh
yarn run server-dev
yarn run react-dev
```

Deployment: 
Heroku has deployment problems. If application error occurs <file>.mmdb not found, change the node version and redeploy. The problem should go away.

Keys:
Change anything that has process.env.<Name> with the actual keys (Except for postgresSQL. The key is already set up in package.JSON). CHANGE IT BACK BEFORE COMMITING

Setting up postgreSQL:
  Tables:
    Users: 
      ID, Facebook ID
    Resumes:
      ID, Users' ID (foreign key), Keywords

Tip: Use Postico to set up SQL schema.

### Installing Dependencies

From within the root directory:

```sh
yarn install
```

### Roadmap
- Show FB friends that work for the same company
- Require users to sign in before displaying results

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.