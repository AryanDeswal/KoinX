const axios = require('axios');
const { isValidDate } = require('../utils/isValidDate');
const { getCurrencySymbolById } = require('../utils/getCurrencySymbolById');

module.exports.postPrice = async (req, res) => {
    const { fromCurrency, toCurrency, date } = req.body;

    // Check the presence of all necessary fields
    if (!fromCurrency || !toCurrency || !date) {
        return res.status(422).json({ error: 'Incomplete request due to missing data' });
    }

    // Check if date format is valid
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date format or date out of range. Please use dd-mm-yyyy format and ensure the date is valid.' });
    }

    try {
        // Fetch historical price data from Coingecko API
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history`, {
            params: {
                date: date,
                localization: false
            }
        });

        const priceData = response.data;

        // Check if data is available for the specified date
        if (!priceData.market_data || !priceData.market_data.current_price) {
            return res.status(404).json({ error: `No data available for ${fromCurrency} on ${date}.` });
        }

        // Get the currency symbol associated with the toCurrency identifier
        const toCurrencySymbol = await getCurrencySymbolById(toCurrency);

        // Get the price of 'toCurrency' on the specified date
        const priceInToCurrency = priceData.market_data.current_price[toCurrencySymbol];

        if (!priceInToCurrency) {
            return res.status(404).json({ error: `Price conversion not available from ${fromCurrency} to ${toCurrency} on ${date}.` });
        }

        // Send the response
        res.json({
            fromCurrency,
            toCurrency,
            date,
            price: priceInToCurrency
        });
    } catch (error) {
        console.error('Error fetching price data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
};

module.exports.postCompanies = async (req, res) => {
    const { currency } = req.body;

    // Check the presence of all necessary fields
    if (!currency) {
        return res.status(422).json({ error: 'Incomplete request due to missing data.' });
    }

    // Validate currency input
    if (!['bitcoin', 'ethereum'].includes(currency.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid currency. Possible values are only bitcoin or ethereum.' });
    }

    try {
        // Fetch list of companies from Coingecko API
        const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);

        // Extract the list of companies
        const companies = response.data.companies.map(company => company.name);

        // Send the response
        res.json({ companies });
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(404).json({ error: 'Coin not supported' });
    }
}