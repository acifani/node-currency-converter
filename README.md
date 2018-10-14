# node-currency-converter

Simple node that exposes a single endpoint to convert amounts between currencies.

Data is fetched upon server start from the 
[ECB Reference Rates](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml).

## Install

```sh
$ git clone git@github.com:acifani/node-currency-converter.git
$ cd node-currency-converter
$ npm install
$ npm run start
```

## Configuration

You can configure two environment variables

- `NODE_ENV`: One of `production`, `test`, `development`
- `PORT`: Local port the node server will listen to

## Usage

Issue a `GET` request to the `/convert` endpoint. It accepts the following query string parameters

| Name             | Required | Type   | Description                                                                          |
|------------------|----------|--------|--------------------------------------------------------------------------------------|
| `amount`         | yes      | float  | Amount to convert (e.g. `12.35`)                                                     |
| `src_currency`   | yes      | string | ISO currency code for the source currency (e.g. `EUR`, `USD`, `GBP`)                 |
| `dest_currency`  | yes      | string | ISO currency code for the destination currency (e.g. `EUR`, `USD`, `GBP`)            |
| `reference_date` | no       | string | Reference date for the exchange rate, in `YYYY-MM-DD` format (e.g. `2018-10-12`)     |

**Note**: Only rates for the last 90 days are available. Rates are only available for working days.

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
