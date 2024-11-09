const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getLeaderboard = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "select student.id, student.first_name, student.last_name, sum(score) as total_score from student join score on student.id = score.student_id group by student.id order by total_score desc";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getStudent = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT * FROM student";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    

    return {
        getStudent,
        getLeaderboard
    };
};
