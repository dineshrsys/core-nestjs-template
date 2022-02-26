# core-nestjs API

## Description

### Project Introduction

- Support ES6/ES7 features
- NestJs
- Sequelize
- Postgres
- Docker [ Not now ]
- Prettier

## Features

##### Authentication:

- jwt authentication

## Requirements

- node >= 14.0
- npm >= 7.0
- postgres = 13.0
- typescript >= 4.0
- Redis >= 6

## Running the API

### Development

To start the application in development mode, run:

```bash
npm run start:dev
```

Start the application in production env:

Install ts pm2 and typescript compiler:

```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:

```
pm2 start ./dist/src/main.js -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode The developer mode will watch your changes then
will transpile the TypeScript code and re-run the node application automatically.

### Docker

* [Install Docker](https://docs.docker.com/get-docker/)
* [Install docker-compose](https://docs.docker.com/compose/install/)

To run your app in docker containers choose "Yes" when the generator asks you about docker.

#### Now, lift your app in docker

``` 
  docker-compose up 
``` 

## Set up environment

In root folder you can find `.env`. You can use this config or change it for your purposes.

## Swagger

Swagger documentation will be available on route:

```bash
http://localhost:3000/docs
```
