if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/homeRoutes');
const { updateCryptos } = require('./utils/updateCryptos')

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/cryptoDB';
mongoose.connect(dbURL)
    .then((result) => app.listen(3000, () => {
        console.log('Server is running on port 3000');
    }))
    .catch((err) => console.log(err));

// Initial update when server starts
updateCryptos();

// Schedule background job to update cryptocurrencies every hour
cron.schedule('0 * * * *', () => {
    updateCryptos();
});

app.use(homeRoutes);