const fetch = require('node-fetch');
const fs = require('fs');
const ba = require('bitcoinaverage');
//Saving 
require('dotenv').config();
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const SECRET_KEY = process.env.SECRET_KEY;


const coinDataHandler = {};

coinDataHandler.fetchData = (req, res, next) => {
    // console.log(PUBLIC_KEY)
    // console.log(SECRET_KEY)
    //requesting data from bitcoinaverage
    const restClient = ba.restfulClient(PUBLIC_KEY, SECRET_KEY);
    
    const symbols = ['BTCUSD', 'ETHUSD', 'LTCUSD', 'XRPUSD', 'BCHUSD', 'XMRUSD', 'DASHUSD', 'ZECUSD', 'NEOUSD', 'QTUMUSD'];

    const realNames = ['Bitcoin', 'Ethereum', 'Litecoin', 'Ripple', 'Bitcoin Cash', 'Monero', 'DASH', 'ZCash', 'NEO', 'QTUM'];

    restClient.tickerAllLocal('BTC,ETH,LTC,XRP,BCH,XMR,DASH,ZEC,NEO,QTUM', 'USD', (response) => {

        let newData = JSON.parse(response);
        const arr = []
        for(let i = 0; i < symbols.length; i++) {
            let obj = {}
            obj['name'] = realNames[i];
            obj['symbol'] = symbols[i];
            obj['price'] = newData[symbols[i]].ask;
            obj['volume'] = newData[symbols[i]].volume;
            obj['changesInHourPercent'] = (newData[symbols[i]].changes.percent.hour * 100).toFixed(2);
            arr.push(obj);
        }
        res.locals.data = arr;
        next();
    })


    

}

module.exports = coinDataHandler;