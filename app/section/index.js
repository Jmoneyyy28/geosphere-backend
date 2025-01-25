const express = require('express');
const bodyParser = require('body-parser');

module.exports = (dbConnection) => {
    const controller = require('./section.controller')(dbConnection);
    const router = require('./section.router');
    const route = express.Router();
    route.use(bodyParser.json());

    return router(route, controller);
};
