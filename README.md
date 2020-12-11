# Instructions

Starter template for 😻 [NestJS](https://nestjs.com/), [Prisma 2](https://www.prisma.io/) and [GraphQL](https://graphql.org/).

## Features

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- 🔐 JWT authentication w/ [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- 🔐 Simple Permission System using decorators and guards.
- Sequence generator from database

---

## Quick Setup

Clone and install depenencies:

```bash
yarn
```

then create Postgres DB (or setup yours at .env):

```bash
docker-compose -f docker-compose.db.yml up -d
# or
yarn docker:db
```

Then seed

```bash
yarn seed
```

Then rum at dev:

```bash
yarn start:dev
```
