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
        }));

        

    return route;
};
