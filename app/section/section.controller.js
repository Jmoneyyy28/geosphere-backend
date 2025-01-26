const mysql = require('mysql2/promise');
module.exports = (dbConnection) => {
    const getSection = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT * FROM section";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }

    return {
        getSection
    };
};
