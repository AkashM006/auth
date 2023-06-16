# Boilerplate Express Project

This repository hosts the boilerplate code that I use mostly. In order to boost productivity it has been hosted online.

# How to run the project

- Download the project and use yarn/npm to install all the dependencies.

> `yarn` / `npm i`

- Then create a **.env** file and fill the following contents.

> PORT=3000

> DATABASE_URL="postgresql://postgres:Abcd@1234@localhost:5432/test"

> ACCESS_TOKEN_SECRET= Some random long string

> REFRESH_TOKEN_SECRET= Some random long string

> SALT_ROUNDS=12

_Note: the database url might change based on your settings. The format for it somewhat like this: postgresql://[username]:[password]@[host]:[port]/[database_name]_

- Run the following command on the terminal to start the server

`yarn dev` / `npm run dev`

# Packages used

## bcrypt

A [library](https://www.npmjs.com/package/bcrypt) to help you hash passwords.

You can read about [bcrypt in Wikipedia](https://en.wikipedia.org/wiki/Bcrypt) as well as in the following article: [How To Safely Store A Password](http://codahale.com/how-to-safely-store-a-password/)

## cors

[CORS](https://www.npmjs.com/package/cors) is a node.js package for providing a [Connect](http://www.senchalabs.org/connect/)/[Express](http://expressjs.com/) middleware that can be used to enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.

## express

[Express](https://www.npmjs.com/package/express) is a fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org/).

## express-rate-limit

[Express rate limit](https://github.com/express-rate-limit/express-rate-limit) is a basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. Plays nice with [express-slow-down](https://www.npmjs.com/package/express-slow-down).

## jsonwebtoken

[This package](https://github.com/auth0/node-jsonwebtoken#readme) is an implementation of [JSON Web Tokens](https://tools.ietf.org/html/rfc7519).

## prisma

[Prisma](https://www.prisma.io/) is a **next-generation ORM** that consists of these tools:

- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Auto-generated and type-safe query builder for Node.js & TypeScript

- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Declarative data modeling & migration system

- [**Prisma Studio**](https://github.com/prisma/studio): GUI to view and edit data in your database

## swagger-jsdoc

[This library](https://www.npmjs.com/package/swagger-jsdoc) reads your [JSDoc](https://jsdoc.app/)-annotated source code and generates an [OpenAPI (Swagger) specification](https://swagger.io/specification/).

## swagger-ui-express

[This module](https://www.npmjs.com/package/swagger-ui-express) allows you to serve auto-generated [swagger-ui](https://swagger.io/tools/swagger-ui/) generated API docs from express, based on a `swagger.json` file. The result is living documentation for your API hosted from your API server via a route.

## winston

[This library](https://github.com/winstonjs/winston) is a logger for just about everything.

## winston-daily-rotate-file

[This library](https://github.com/winstonjs/winston-daily-rotate-file) is a transport for [winston](https://github.com/winstonjs/winston) which logs to a rotating file. Logs can be rotated based on a date, size limit, and old logs can be removed based on count or elapsed days.

## yup

[This library](https://github.com/jquense/yup) is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformation.

# Swagger

Swagger is a tool used for documenting APIs so that anyone using this can understand how the responses are and what the required parameters are without having to take a glance at the code for that.

For this project swagger is setup such that the docs are available in [localhost:3000/api/docs](http://localhost:3000/api/docs) once the project is run.

When adding new routes to the app by creating new files in the routes folder, also add the open api decorator to make them appear in swagger docs.

View the sample [here](https://forge.etsi.org/swagger/editor/)
