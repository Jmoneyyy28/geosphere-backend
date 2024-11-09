const express = require('express');

module.exports = (route, controller) => {    
    route.use('/feedback', express.Router()
        .get('/', async (req, res) => {
            const student_id = req.query.student_id
            const [rows, fields] = await controller.getFeedback(student_id);
            res.send(rows);
        }));

    return route;
};
