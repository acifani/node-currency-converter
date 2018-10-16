# node-currency-converter 

[![Build Status](https://travis-ci.com/acifani/node-currency-converter.svg?token=zXxjmUAUHdhMP41u9scc&branch=master)](https://travis-ci.com/acifani/node-currency-converter)
[![Coverage Status](https://coveralls.io/repos/github/acifani/node-currency-converter/badge.svg?branch=master)](https://coveralls.io/github/acifani/node-currency-converter?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/df4e4744bdcbd36078ae/maintainability)](https://codeclimate.com/github/acifani/node-currency-converter/maintainability) [![Greenkeeper badge](https://badges.greenkeeper.io/acifani/node-currency-converter.svg)](https://greenkeeper.io/)

Simple node that exposes a single endpoint to convert amounts between currencies.

Data is fetched upon server start from the
[ECB Reference Rates](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml).

You can [try it online](https://node-currency-converter.herokuapp.com/convert?amount=120&src_currency=EUR&dest_currency=USD&reference_date=2018-10-12),
but keep in mind that there could be older rates only.

## Install

**Note**: for Docker instructions, see [Docker](#docker)

```sh
$ git clone git@github.com:acifani/node-currency-converter.git
$ cd node-currency-converter
$ npm install
$ npm run start
```

## Configuration

You can configure two environment variables

- `NODE_ENV`: One of `production`, `test`, `development`, defaults to `development`
- `PORT`: Local port the node server will listen to, defaults to `9393`

## Docker

If you have Docker installed you can also use `docker-compose` to run the server

```sh
$ git clone git@github.com:acifani/node-currency-converter.git
$ cd node-currency-converter
$ docker-compose up

```

## Usage

Issue a `GET` request to the `/convert` endpoint. It accepts the following query string parameters

| Name             | Required | Type   | Description                                                                          |
|------------------|----------|--------|--------------------------------------------------------------------------------------|
| `amount`         | yes      | float  | Amount to convert (e.g. `12.35`)                                                     |
| `src_currency`   | yes      | string | ISO currency code for the source currency (e.g. `EUR`, `USD`, `GBP`)                 |
| `dest_currency`  | yes      | string | ISO currency code for the destination currency (e.g. `EUR`, `USD`, `GBP`)            |
| `reference_date` | no       | string | Reference date for the exchange rate, in `YYYY-MM-DD` format (e.g. `2018-10-12`)     |

**Notes**

- Rates are available for the last 90 days
- Rates are available for working days only
- If `reference_date` is not specified, it defaults to today's date

### Example

```sh
$ curl -s "http://localhost:9393/convert?amount=10&src_currency=EUR&dest_currency=GBP&reference_date=2018-10-12"
{"amount":8.764,"currency":"GBP"}
```

### Development

The application has been developed using TypeScript and Express.
It uses Jest and Supertest for testing, TSLint for linting, and Prettier for formatting.

There are some NPM scripts available for convenience

```sh
$ npm run start     # Builds and serves the app
$ npm run build     # Builds the app in ./dist
$ npm run lint      # Runs TSLint
$ npm run watch     # Serves the app and reloads on code changes
$ npm run test      # Runs tests with Jest
$ npm run coverage  # Runs tests and generates coverage report
```
