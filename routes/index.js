const router = require('express').Router()
const satelliteImageRoutes = require('./satelliteImages.routes');
const orderRoutes = require('./orders.routes');

router.use('/satellite-images', satelliteImageRoutes);
router.use('/orders', orderRoutes);

module.exports = router;