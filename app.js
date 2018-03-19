const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//user morgan
app.use(morgan("dev"));

//body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect mogo DB
mongoose.connect('mongodb+srv://darren:' + process.env.MONGO_PW + '@cluster0-pjrp3.mongodb.net/test',{
    useMongoClient:true
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//handle error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;