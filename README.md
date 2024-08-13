<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

Basic books CRUD API. This project is made for the #GruposTrabajoAuJ test.

Built with Typescript, NestJS, TypeORM and SQLite.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Endpoints
- [localhost:3000/](localhost:3000/) --> "cv" page
  - [api/books](localhost:3000/books/) 
  - [api/books/:id](localhost:3000/books/1)
  - [api/authors](localhost:3000/authors) 
  - [api/authors/:id](localhost:3000/authors/1)
  - [api/categories](localhost:3000/categories) 
  - [api/categories/:id](localhost:3000/categories/1)
  - [api/publishers](localhost:3000/publishers)
  - [api/publishers/:id](localhost:3000/publishers/1)

## License

Nest is MIT licensed.
This project is [Unlicenced](LICENCE).