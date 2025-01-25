const express = require('express');

module.exports = (route, controller) => {    
    route.use('/section', express.Router()
        .get('/', async (req, res) => {
            const [rows, fields] = await controller.getSection();
            res.send(rows);
        }));

    return route;
};
