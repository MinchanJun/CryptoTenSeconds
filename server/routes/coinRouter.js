const express = require('express');
const router = express.Router();
const coinDataHandler = require('../controller/coinDataHandler');

router.post('/email', coinDataHandler.handleEmail, (req,res) => {
    res.status(200).json({'a': 'Success'});
})

router.get('/', coinDataHandler.fetchData,  (req, res) => {
    // console.log(res.locals.data);
    res.status(200).json(res.locals.data);
})



module.exports = router;