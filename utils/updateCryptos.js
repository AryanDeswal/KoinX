const axios = require('axios');
const {Crypto} = require('../models/Crypto');

// Function to fetch and update cryptocurrencies
async function updateCryptos() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const cryptos = response.data;

        // Clear existing data
        await Crypto.deleteMany({});

        // Insert new data
        await Crypto.insertMany(cryptos);
        console.log('Cryptocurrencies updated successfully');
    } catch (error) {
        console.error('Error updating cryptocurrencies:', error);
    }
}

module.exports = { updateCryptos };