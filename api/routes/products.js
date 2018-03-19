const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(result => {
            if (result.length >= 0) {
                res.json({
                    products: result
                })
            }
            else {
                res.json({
                    message: "No entries found"
                })
            }
        })
        .catch(error => {
            res.json({
                message: error
            })
        });
});

router.post('/', (req, res, next) => {
    var product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
        .save()
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    res.status(200).json({
        message: 'Handling POST to products',
        createdProduct: product
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    product: result
                })
            }
            else {
                res.status(404).json({
                    message: `No valid entry for productId ${id}`
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            })
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error)
        });
});

module.exports = router;