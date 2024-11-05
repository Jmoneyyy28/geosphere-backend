const express = require('express');
const bodyParser = require('body-parser');

module.exports = (dbConnection) => {
    const controller = require('./leaderboard.controller')(dbConnection);
    const router = require('./leaderboard.router');
    const route = express.Router();
    route.use(bodyParser.json());

    return router(route, controller);
};
