require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');

//# INIT MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression()); // nén data trả về

//# INIT DB
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();
//# INIT ROUTES
app.get('/', function (req, res,next) {
    res.status(200).json({
      msg: 'Hello World'
    })
})

//# HANDLING ERRORS

module.exports = app;