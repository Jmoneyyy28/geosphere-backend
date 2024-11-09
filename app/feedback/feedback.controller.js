const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getFeedback = async (student_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `select feedback.feedback, quiz.quiz_title, teacher.first_name, teacher.last_name from feedback join quiz on quiz.id = feedback.quiz_id  join teacher on teacher.id = feedback.teacher_id where feedback.student_id=${student_id}`
        const response = await connection.query(query);
        await connection.end();
        return response;
    }

    return {
        getFeedback
    };
};
