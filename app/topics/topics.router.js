const express = require('express');

module.exports = (route, controller) => {    
    route.use('/topics', express.Router()
        .get('/', async (req, res) => {
            const [rows, fields] = await controller.getTopics();
            res.send(rows);
        }));

    return route;
};
