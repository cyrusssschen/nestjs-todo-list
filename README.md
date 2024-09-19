## Description

A quick demo of running graphql with nestjs

## Project setup

```
### prerequisites

- Docker
- mysql container

# create database

# create `.env` file with the following env variable
DATABASE_URL="mysql://root:[your-password]@localhost:3306/[your-dbname]"

# run db migrate
$ npx prisma migrate dev --name init

```

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# open the following url
  http://localhost:3000/graphql

```

![alt text](https://github.com/user-attachments/assets/5cce5c76-170e-4ba3-94ad-77d8db2aa4d1)

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## TODO

- Implement authentication based on users info in `User` table
- Unit tests
