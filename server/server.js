const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const coinRouter = require('./routes/coinRouter');
const path = require('path');
require('dotenv').config();

//handle body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//handle the route
app.use('/api', coinRouter);


if(process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  
  app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../src/index.html'));
  });
}


// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// 400 errors
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000)

module.exports = app;