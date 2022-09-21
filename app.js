const express = require('express');
const ExpressError = require('./errors.js');
const routes = require('./routes.js');
const app = express();

app.use(express.json());
app.use('/items',routes);

app.use(function (req,res,next){
  const newError = new ExpressError('Item not found', 404)
  return next(newError);
});


// include error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});


module.exports = app;