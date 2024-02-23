const axios = require('axios');
const { isValidDate } = require('../utils/isValidDate');
const { getCurrencySymbolById } = require('../utils/getCurrencySymbolById');

module.exports.postPrice = async (req, res) => {
    const { fromCurrency, toCurrency, date } = req.body;

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