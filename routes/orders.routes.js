const router = require('express').Router()

const orderControllers = require('../controllers/orders.controllers')

router.get('/', orderControllers.findAll)

router.post('/:catalogID', orderControllers.create)

module.exports = router;