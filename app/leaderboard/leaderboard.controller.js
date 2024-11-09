const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getStudents = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT student_name, score FROM leaderboard";

        return await connection.query(query);
    }

    return {
        getStudents
    };
};
