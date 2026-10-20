# KoinX

A Node.js REST API on top of the CoinGecko API for historical crypto-to-crypto prices and public companies that hold Bitcoin or Ethereum.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![CoinGecko](https://img.shields.io/badge/CoinGecko_API-8DC63F?logo=coingecko&logoColor=white)

## About

KoinX is an Express backend built around three tasks. It keeps a MongoDB copy of CoinGecko's full coin list, refreshed by a background job every hour. It exposes an endpoint that returns the price of one cryptocurrency in terms of another on a given date, and another that lists the public companies holding Bitcoin or Ethereum in their treasury.

## Features

- **Coin list sync:** fetches every coin's `id`, `symbol` and `name` from CoinGecko's `/coins/list` and stores it in MongoDB, on startup and then every hour with `node-cron`
- **Historical price:** `POST /price` returns the price of `fromCurrency` in `toCurrency` on a `dd-mm-yyyy` date, using CoinGecko's `/coins/{id}/history`
- **Public treasury:** `POST /companies` returns the names of companies holding `bitcoin` or `ethereum`, using CoinGecko's `/companies/public_treasury/{coin}`
- Input checks: missing fields (`422`), date format and calendar validity (`400`), allowed currencies (`400`)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 4, body-parser
- **Database:** MongoDB with Mongoose 8
- **HTTP client:** axios
- **Scheduler:** node-cron
- **Config:** dotenv
- **Dev:** nodemon

## Project Structure

```
KoinX/
├── app.js                          # Express app, MongoDB connection, hourly cron job, server on port 3000
├── controllers/
│   └── homeController.js           # /price and /companies handlers
├── models/
│   └── Crypto.js                   # Mongoose schema: id, name, symbol
├── routes/
│   └── homeRoutes.js               # Route definitions
├── utils/
│   ├── updateCryptos.js            # Refreshes the coin list in MongoDB
│   ├── getCurrencySymbolById.js    # Looks up a coin's symbol on CoinGecko
│   └── isValidDate.js              # dd-mm-yyyy validation
├── .example.env                    # Environment variable template
└── package.json
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB instance (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/AryanDeswal/KoinX.git
cd KoinX
npm install
```

### Environment Variables

Copy `.example.env` to `.env` and set the value:

```bash
cp .example.env .env
```

| Variable | Purpose                                                                                  |
| -------- | ---------------------------------------------------------------------------------------- |
| `DB_URL` | MongoDB connection string. Defaults to `mongodb://localhost:27017/cryptoDB` if not set.   |

`.env` is only loaded when `NODE_ENV` is not `production`. No CoinGecko API key is used; requests go to the public `api.coingecko.com/api/v3` endpoints.

### Run

```bash
npm start       # node app.js
npm run serve   # nodemon app.js (auto-reload)
```

The server listens on `http://localhost:3000`. The coin list sync runs once at startup and then at the start of every hour.

## API Reference

| Method | Route        | Description                                                         |
| ------ | ------------ | ------------------------------------------------------------------- |
| POST   | `/price`     | Price of `fromCurrency` in `toCurrency` on `date` (`dd-mm-yyyy`)     |
| POST   | `/companies` | Companies holding `currency` (`bitcoin` or `ethereum`)              |

Currencies are CoinGecko coin IDs, for example `bitcoin` or `ethereum`.

### `POST /price`

Request:

```json
{
  "fromCurrency": "bitcoin",
  "toCurrency": "ethereum",
  "date": "12-01-2022"
}
```

Response:

```json
{
  "fromCurrency": "bitcoin",
  "toCurrency": "ethereum",
  "date": "12-01-2022",
  "price": 13.179645730746424
}
```

The price comes from the `market_data.current_price` of `fromCurrency` on that date, keyed by the symbol of `toCurrency`. So `toCurrency` has to be one of the currencies CoinGecko quotes prices in (for example `bitcoin`, `ethereum`, `binancecoin`).

Errors: `422` missing fields, `400` invalid date, `404` no data for that date or no conversion to `toCurrency`, `500` CoinGecko request failed.

### `POST /companies`

Request:

```json
{
  "currency": "ethereum"
}
```

Response:

```json
{
  "companies": ["Meitu Inc", "Mogo Inc."]
}
```

Errors: `422` missing `currency`, `400` currency other than `bitcoin` or `ethereum`, `404` CoinGecko request failed.
