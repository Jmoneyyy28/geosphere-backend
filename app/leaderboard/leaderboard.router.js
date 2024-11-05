const express = require('express');

module.exports = (route, controller) => {    
    route.use('/leaderboard', express.Router()
        .get('/', async (req, res) => {
            const [rows, fields] = await controller.getStdents();
            res.send(rows);
        }));

    return route;
};
