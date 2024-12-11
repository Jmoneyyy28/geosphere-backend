const express = require('express');

module.exports = (route, controller) => {    
    route.use('/feedback', express.Router()
        .get('/', async (req, res) => {
            const student_id = req.query.student_id
            const [rows, fields] = await controller.getFeedback(student_id);
            res.send(rows);
        })
        .post('/teacherFeedback', async (req, res) => {
           const teacher_id = req.body.teacher_id;
           const student_id = req.body.student_id;
           const feedback = req.body.feedback;
            const [rows, fields] = await controller.saveFeedback(teacher_id, student_id, feedback)
            res.send('Success');
        }));

    return route;
};
