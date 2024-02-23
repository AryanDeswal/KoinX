const axios = require('axios');
const { Crypto } = require('../models/Crypto');

// Function to fetch and update cryptocurrencies
async function updateCryptos() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const cryptos = response.data;

        // Clear existing data
        await Crypto.deleteMany({});

        // Insert new data
        // Iterate through the array
        for (const crypto of cryptos) {
            // Create a new instance of the Dog model with each object
            const newCrypto = new Crypto(crypto);
            // Save the new dog object to the database
            await newCrypto.save();
        }
        console.log('Cryptocurrencies updated successfully');
    } catch (error) {
        console.error('Error updating cryptocurrencies:', error);
    }
}

module.exports = { updateCryptos };