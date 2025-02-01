const express = require('express');

module.exports = (route, controller) => {    
    route.use('/students', express.Router()
        .get('/leaderboard', async (req, res) => {
            const [rows, fields] = await controller.getLeaderboard();
            res.send(rows);
        })
        .get('/studentmap', async (req, res) => {
            const teacher_id = req.query.teacher_id
            const [rows, fields] = await controller.getStudentList(teacher_id);
            res.send(rows);
        })
        .post('/savestudentmap', async (req, res) => {
            const section_id = 3;
            const teacher_id = req.body.teacher_id;
            const student_ids = req.body.student_ids;
            const [rows, fields] = await controller.saveStudentList(section_id, teacher_id, student_ids)
            res.send('Success');
        })
        .get('/studentfeedback', async (req, res) => {
            const teacher_id = req.query.teacher_id
            const [rows, fields] = await controller.getStudentFeedback(teacher_id);
            res.send(rows);
        })
        .post('/deleteStudent', async (req, res) => {
            const student_id = req.body.student_id
            const [rows, fields] = await controller.deleteStudent(student_id);
            res.send(rows);
        }));


    return route;
};
