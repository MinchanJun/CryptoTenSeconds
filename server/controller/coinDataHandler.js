const fetch = require('node-fetch');
const fs = require('fs');
const ba = require('bitcoinaverage');
const sgMail = require('@sendgrid/mail');

//Saving 
require('dotenv').config();
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

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

coinDataHandler.handleEmail = (req, res, next) => {

    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log(req.body.email)
    const msg = {
        to: req.body.email,
        from: 'ben-jun@hotmail.com',
        subject: 'Thank you for Subscribing 10 seconds Cryptocurrency Market',
        text: `Thank you for subscribing at 10 seconds Cryptocurrency Market. 
        I am currently still implementing this feature right now, so please stay tuned. I will make sure to focus on you to have a better experience. 
        Please connect me with linked in here https://linkedin.com/in/minchan-jun-08106160 
        Follow my github at https://github.com/MinchanJun
        `
    };
    sgMail
    .send(msg)
    .then(() => {
      console.log('Yoo hoo')
    })
    .catch(error => {
      // Log friendly error
      console.error(error);
  
      if (error.response) {
        // Extract error msg
        const {message, code, response} = error;
  
        // Extract response msg
        const {headers, body} = response;
  
        console.error(body);
      }
    });

    return next()

}

module.exports = coinDataHandler;