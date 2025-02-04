const router = require('express').Router()
const satelliteImageRoutes = require('./satelliteImage.routes');
const orderRoutes = require('./order.routes');

router.use('/satellite-images', satelliteImageRoutes);
router.use('/orders', orderRoutes);

module.exports = router;