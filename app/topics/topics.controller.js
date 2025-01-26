const { response } = require('express');
const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    // console.log(dbConnection);
    // const connection = mysql.createPool(dbConnection);

    const getTopics = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT * FROM topic";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getQuiz = async (lesson_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `select * from quiz where lesson_id = ${lesson_id}`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getQuestion = async (quiz_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `select * from question where quiz_id = ${quiz_id}`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getLesson = async (topic_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `select * from lesson where topic_id = ${topic_id}`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const postScore = async (student_id, quiz_id, score) => {
        const connection = await mysql.createConnection(dbConnection);
        const selectQuery = `SELECT * FROM score where quiz_id = ${quiz_id} and student_id = ${student_id}`
        const [rows, fields] = await connection.query(selectQuery);
        let query = null;
        if(rows.length > 0){
            query = `UPDATE score set score = ${score} where quiz_id = ${quiz_id} and student_id = ${student_id}`;
        }else{
            query = `INSERT INTO score (student_id, quiz_id, score) values (${student_id}, ${quiz_id}, ${score})`;
        }
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getScore = async (student_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `SELECT student.id AS student_id, topic.id, topic.topic_name, SUM(score.score) AS score

                    FROM topic

                    CROSS JOIN student

                    LEFT JOIN lesson
                    ON lesson.topic_id = topic.id

                    LEFT JOIN quiz
                    ON quiz.lesson_id = lesson.id

                    LEFT JOIN score
                    ON score.quiz_id = quiz.id
                    AND score.student_id = student.id

                    WHERE student.id = ${student_id}

                    GROUP BY student.id, topic.id, topic.topic_name`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const postProgress = async(student_id, progressName, topic_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `INSERT INTO map_student_progress (student_id, progress_id, progress_isDone, topic_id) values (${student_id}, (SELECT id FROM progress WHERE LOWER(name) = LOWER('${progressName}')), true, ${topic_id})`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getStudentProgress = async (student_id, progressName, topic_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `SELECT student.id, topic.topic_name AS topic_name, progress.name, map_student_progress.progress_isDone

                        FROM student

                        CROSS JOIN progress

                        CROSS JOIN topic

                        LEFT JOIN map_student_progress
                        ON map_student_progress.progress_id = progress.id
                        AND map_student_progress.student_id = student.id
                        AND map_student_progress.topic_id = topic.id

                        WHERE student.id = ${student_id}

                        GROUP BY student.id, topic.topic_name, progress.name, map_student_progress.progress_isDone`
        const response = await connection.query(query);
        await connection.end();
        return response;

    }
    const getAllStudentProgress = async (teacher_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `SELECT DISTINCT student.id, student.id_number, topic.id AS topic_id, progress.name, map_student_progress.progress_isDone

                                FROM student

                                CROSS JOIN progress

                                CROSS JOIN topic

                                CROSS JOIN map_section_teacher_student

                                LEFT JOIN map_student_progress
                                ON map_student_progress.progress_id = progress.id
                                AND map_student_progress.student_id = student.id
                                AND map_student_progress.topic_id = topic.id

                        GROUP BY student.id, topic.id, progress.name, map_student_progress.progress_isDone`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    return {
        getTopics,
        getQuiz,
        getQuestion,
        getLesson,
        postScore,
        getScore,
        postProgress,
        getStudentProgress,
        getAllStudentProgress
    };
};
