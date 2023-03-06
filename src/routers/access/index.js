'use strict';
const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access/access.controller');



router.post('/shop/signup', accessController.signUp);

module.exports = router;