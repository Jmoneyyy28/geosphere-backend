const express = require('express');

module.exports = (route, controller) => {    
    route.use('/badges', express.Router()
        .get('/', async (req, res) => {
            const [rows, fields] = await controller.getBadges();
            res.send(rows);
        }));

    return route;
};
