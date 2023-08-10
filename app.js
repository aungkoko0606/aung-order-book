const express = require('express');
const app = express();
const orderBookRouter = require('./routes/orderBookRoutes');

app.use(express.json());
app.use('/api/v1/orderbook/price', orderBookRouter);

module.exports = app;