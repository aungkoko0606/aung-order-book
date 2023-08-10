const express = require('express')
const orderBookController = require('./../controllers/orderBookController')

const router = express.Router();
router.get('/', orderBookController.getAverageMidPrice);

module.exports = router;