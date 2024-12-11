const express = require('express');

module.exports = (route, controller) => {    
    route.use('/topics', express.Router()
        .get('/', async (req, res) => {
            const [rows, fields] = await controller.getTopics();
            res.send(rows);
        })
        .get('/question', async (req, res) => {
            const quiz_id = req.query.quiz_id
            const [rows, fields] = await controller.getQuestion(quiz_id);
            res.send(rows);
        })
        .get('/quiz', async (req, res) => {
            const lesson_id = req.query.lesson_id
            const [rows, fields] = await controller.getQuiz(lesson_id);
            res.send(rows);
        })
        .get('/lesson', async (req, res) => {
            const topic_id = req.query.topic_id
            const [rows, fields] = await controller.getLesson(topic_id);
            res.send(rows);
        })
        .post('/quiz', async (req, res) => {
            const student_id = req.body.student_id;
            const quiz_id = req.body.quiz_id;
            const score = req.body.score;
            const [rows, fields] = await controller.postScore(student_id, quiz_id, score)
            res.send( 'success')
        })   
        .get('/score', async (req, res) => {
            const student_id = req.query.student_id
            const [rows, fields] = await controller.getScore(student_id);
            res.send(rows);
        })
        .post('/progress', async (req, res) => {
            const student_id = req.body.student_id;
            const progressName = req.body.progressName;
            const topic_id = req.body.topic_id;
            console.log(req.body.topic_id);
            const [rows, fields] = await controller.postProgress(student_id, progressName, topic_id);
            res.send( 'success')
        })
        .get('/studentProgress', async (req, res) => {
            const student_id = req.query.student_id
            const progressName = req.body.progressName;
            const topic_id = req.body.topic_id;
            const [rows, fields] = await controller.getStudentProgress(student_id, progressName, topic_id);
            res.send(rows);
        })
        .get('/allStudentProgress', async (req, res) => {
            const teacher_id = req.query.teacher_id;
            const [rows, fields] = await controller.getAllStudentProgress(teacher_id);
            res.send(rows);
        })
    );

    return route;
};
