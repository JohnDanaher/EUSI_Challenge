const router = require('express').Router()

const imageControllers = require('../controllers/images.controllers')

router.get('/', imageControllers.findAll)

router.get('/:catalogID', imageControllers.findOne)

module.exports = router;