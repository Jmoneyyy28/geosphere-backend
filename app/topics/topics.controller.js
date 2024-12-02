const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getTopics = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT * FROM topic";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }

    return {
        getTopics
    };
};
