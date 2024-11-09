const express = require('express');

module.exports = (route, controller) => {    
    route.use('/students', express.Router()
        .get('/leaderboard', async (req, res) => {
            const [rows, fields] = await controller.getLeaderboard();
            res.send(rows);
        }));

    return route;
};
