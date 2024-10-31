const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getTopics = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT * FROM topic";

        return await connection.query(query);
    }

    return {
        getTopics
    };
};
