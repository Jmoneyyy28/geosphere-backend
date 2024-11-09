const express = require('express');

module.exports = (route, controller) => {    
    route.use('/feedback', express.Router()
        .get('/', async (req, res) => {
            const [rows, fields] = await controller.getFeedback();
            res.send(rows);
        }));

    return route;
};
