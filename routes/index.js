let router = require('express').Router();

router.use('/image', require('./api/image.route.js'));

module.exports = router;
