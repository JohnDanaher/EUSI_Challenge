const router = require('express').Router()

const satelliteImageControllers = require('../controllers/satelliteImage.controllers')

router.get('/', satelliteImageControllers.findAll)

router.get('/:catalogID', satelliteImageControllers.findOne)

module.exports = router;