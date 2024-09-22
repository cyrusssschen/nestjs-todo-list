## Description

A quick demo of todo-list service built in nestjs

## Prerequisites

- Node.js (version >= 20)
- Docker
- mysql container

## Project setup

```bash
$ yarn install

# create database

# create `.env` file with the following env variable
DATABASE_URL="mysql://root:[your-password]@localhost:3306/[your-dbname]"

# run db migration
$ npx prisma migrate dev --name init
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# swagger api
  http://localhost:3000/api

# graphql
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

- Add more unit tests
