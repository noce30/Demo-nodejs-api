const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Oder was fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        orderId: req.body.orderId,
        name: req.body.name
    }
    res.status(200).json({
        message: 'Order was created',
        order: order
    })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Get order deatail',
        id: id
    })
});

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Updated order',
        id: id
    })
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Deleted order',
        id: id
    })
});

module.exports = router;