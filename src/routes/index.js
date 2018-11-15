const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
import moment from 'moment';

const logged = { logged: true };

module.exports = (app, db) => {

  app.use('/', router);
}
;
