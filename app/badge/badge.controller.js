const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getBadges = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECR * FROM badge";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }

    return {
        getBadges
    };
};
