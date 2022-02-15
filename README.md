# Node Express Template (NET.ts)

The **N**ode **E**xpress **T**emplate (NET.ts) is a small template project which help you to speed up the process of building RESTful API.

Inside of this repoistory you will find fully configured and ready to use **express** based web application for **Node.js** runtime. It’s built on **TypeScript** and follows the best **top-ranked** content on Node.js best practices from https://github.com/goldbergyoni/nodebestpractices repository.

### Main features:

- 🐳 Containerized application
- 🚄 [ExpressJS](http://expressjs.com) framework with [TypeScript](https://www.typescriptlang.org/) on the board
- ♻️ Live reload
- 🏇 minified and optimized code for production build
- ✏️ Linting via [ESLint](https://eslint.org) with Airbnb configuration
- 🚑 Code Formatter with [Prettier](https://prettier.io)
- 📘 VSCode configuration: Debug, Settings, Tasks and extension for ESLint, Prettier, TypeScript
- 🚧 Jest for unit testing
- 🏄 And many more...

## Getting started

Install `Docker` and `Docker Compose` which are used to maximise the convenience of development on local machine.

When both are installed, build the NET.ts image as follow:

```sh
docker-compose build
```

Run the app:

```sh
docker-compose up
```

Go to:

```
 http://localhost:8080/api/health
```

If you see the following response in the browser:

```
{"status":"OK","data":"2022-02-13T20:05:13.965Z"}
```

It means that everything work as expected. You may start to develop your business logic.
Please scroll down to "How to work with NET.ts" section.

## Getting started, standard way (no containerization)

If you want to run NET.ts "standard way" using the `npm` instead of `docker-compose`.
You are free to do it just keep in mind that I develop the NET.ts project on node version 16.
Note: you need to set env variables defined in `.env.local` file.
On mac OS you can use `source .env.local` and `export NODE_ENV PORT API_KEY_TOKEN` + other envs from `.env.local` if any.

Install dependencies:

```
npm install
```

Run server in dev mode:

```
npm run server:dev
```

## How to work with NET.ts

There are few rules that you have to obey to enjoy NET.ts fully.

1. Enviromment variables - define your envs in `.env.local` file and provide validation rules for them inside `@config/config.ts` file.
2. Structure your solution by components. There is an example user CRUD component that shows how you may build logic for your own componnents.
3. Define your routung inside `api.ts` fiile.
4. Describe your newly created API inside `swagger.json` file
5. Do not change code inside the `core` directory.

## Testing

The Jest test suites are run by executing

```sh
npm test
```

To run tests directly insiide of the NET.ts container:

```sh
docker-compose run web npm run test
```

## Code linting

```sh
npm run lint
```

or insde of the container

```sh
docker-compose run web npm run lint
```

## Fixing problems

Automatically fix linter's problems

```sh
npm run lint:fix
```

or insde of the container

```sh
docker-compose run web npm run lint:fix
```

## Logging

```javascript
import logger from '@core/utils/logger';

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.
In production mode, only `info`, `warn`, and `error` logs will be printed to the console.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## SwaggerUI

An interactive API documentation of NET.ts can be accessed at the path: <baseURL>/api-docs \
For local development use this: http://localhost:8080/api-docs \
If your webservice's basePath is different from `"/"` put basePath after `api-docs` in url address e.g. \
for service placed under `<basePath>` subfolder the correct URL is: `https://<baseURL>/<basePath>/api-docs/<basePath>` \
Remember to select correct protocol befor you try to call any endpoint, "http" is used only for local development. \
Important: swaggerUI is disabled for the production env

## Known issues
