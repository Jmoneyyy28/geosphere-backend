const express = require('express');
const bodyParser = require('body-parser');

module.exports = (dbConnection) => {
    const controller = require('./badge.controller')(dbConnection);
    const router = require('./badge.router');
    const route = express.Router();
    route.use(bodyParser.json());

    return router(route, controller);
};
