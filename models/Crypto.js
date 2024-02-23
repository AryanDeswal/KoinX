const mongoose = require('mongoose');

// Define a schema for cryptocurrencies
const cryptoSchema = new mongoose.Schema({
    id: String,
    name: String,
    symbol: String
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = { Crypto };