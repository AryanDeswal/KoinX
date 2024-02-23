# Cryptocurrency API Project

This repository contains code for a cryptocurrency API project that performs various tasks related to cryptocurrencies using Coingecko's API. The project consists of three main tasks, each with its own set of functionalities:

## Task 1: Update Cryptocurrency List in MongoDB

- Fetches the names and IDs of all cryptocurrencies from Coingecko's API.
- Stores this information in a MongoDB database.
- Implements a background job to keep the cryptocurrency list updated every hour.

## Task 2: Retrieve Historical Cryptocurrency Prices

- Builds an API that retrieves the price of one cryptocurrency in terms of another cryptocurrency on a specific date.
- Accepts requests with the `fromCurrency`, `toCurrency`, and `date` parameters.
- Utilizes Coingecko's APIs to fetch historical price data.

## Task 3: Get Companies Holding Specific Cryptocurrency

- Integrates Coingecko's `/companies/public_treasury` API to retrieve a list of companies that hold a particular cryptocurrency.
- Accepts requests with the `currency` parameter specifying the cryptocurrency (only Bitcoin or Ethereum).


## Getting Started:

1. Clone this repository to your local machine.
2. Set up a MongoDB instance, either locally or using MongoDB Atlas.
3. Set up the environment and install the required dependencies.
4. Run the application.

## API Documentation:

- **Task 2**
    - Endpoint: `/price`
    - Method: POST
    - Request Body Schema:
        ```json
        {
		      "fromCurrency": "bitcoin",
		      "toCurrency": "ethereum",
		      "date": "13-01-2022"
	    }
        ```
    - Response Format:
        ```json
        {
		      "fromCurrency": "bitcoin",
		      "toCurrency": "ethereum",
		      "date": "12-01-2022",
		      "price": 13.179645730746424
	    }
        ```
- **Task 3:**
    - Endpoint: `/companies`
    - Method: POST
    - Request Body Schema:
        ```json
        {
		        "currency":"ethereum"
	    }
        ```
    - Response Format:
        ```json
        {
		        "companies": [
			          "Meitu Inc",
			          "Mogo Inc."
		        ]
	    }
        ```
