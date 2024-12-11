const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getFeedback = async (student_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `select feedback.feedback, teacher.first_name, teacher.last_name from feedback join teacher on teacher.id = feedback.teacher_id where feedback.student_id=${student_id}`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const saveFeedback = async (teacher_id, student_id, feedback) => {
        console.log(teacher_id, student_id, feedback);
        const connection = await mysql.createConnection(dbConnection);
        const query = `INSERT INTO feedback (teacher_id, student_id, feedback) values (${teacher_id}, ${student_id}, '${feedback}')`;
        response = await connection.query(query);
        await connection.end();
        return response;
    }


    return {
        getFeedback,
        saveFeedback
    };
};
