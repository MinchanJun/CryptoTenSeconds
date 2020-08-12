const express = require('express');
const router = express.Router();
const coinDataHandler = require('../controller/coinDataHandler');

router.get('/', coinDataHandler.fetchData,  (req, res) => {
    // console.log(res.locals.data);
    res.status(200).json(res.locals.data);
})

module.exports = router;