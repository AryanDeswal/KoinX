const mongoose = require('mongoose');

// Define a schema for cryptocurrencies
const cryptoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id is missing'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is missing'],
        unique: true,
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = { Crypto };