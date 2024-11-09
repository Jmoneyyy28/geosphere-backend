const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getFeedback = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "select feedback from feedback where student_id = 4";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }

    return {
        getFeedback
    };
};
