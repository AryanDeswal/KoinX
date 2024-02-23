const { Crypto } = require('../models/Crypto');

// Function to get the currency symbol by its ID
async function getCurrencySymbolById(id) {
    try {
        const currency = await Crypto.findOne({ id });
        return currency ? currency.symbol : null; // Return symbol if found, null otherwise
    } catch (error) {
        console.error('Error fetching currency data:', error);
        throw new Error('An error occurred while fetching currency data.');
    }
}

module.exports = { getCurrencySymbolById };