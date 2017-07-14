"use strict";

const router = require('express').Router();
const homeCtrl = require('../controllers/home.controllers');

router.route('/')
    /** GET /home */
    .get(homeCtrl.home)

module.exports = router;