const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
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

    return {
        getTopics,
        getQuiz,
        getQuestion,
        getLesson
    };
};
