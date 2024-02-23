const axios = require('axios');

// Function to get the currency symbol by its ID
async function getCurrencySymbolById(currencyID) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${currencyID}`);
        return response.data.symbol; // Return symbol of the currency
    } catch (error) {
        console.error('Error fetching currency data:', error);
        throw new Error('An error occurred while fetching currency data.');
    }
}

module.exports = { getCurrencySymbolById };