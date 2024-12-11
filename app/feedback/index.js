const express = require('express');
const bodyParser = require('body-parser');

module.exports = (dbConnection) => {
    const controller = require('./feedback.controller')(dbConnection);
    const router = require('./feedback.router');
    const route = express.Router();
    route.use(bodyParser.json());

    return router(route, controller);
};
