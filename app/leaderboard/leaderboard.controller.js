const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getTopics = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT * FROM leaderboard";

        return await connection.query(query);
    }

    return {
        getStudents
    };
};
