const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const register = async (username, password, firstName, lastName, idnumber) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `INSERT INTO student (username, password, first_name, last_name, id_number) values ('${username}', '${password}', '${firstName}','${lastName}','${idnumber}')`;
        response = await connection.query(query);
        await connection.end();
        return response;
    }
    const login = async (username, password) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `
        SELECT * FROM student WHERE username='${username}' AND password='${password}'

        UNION

        SELECT * FROM teacher WHERE username='${username}' AND password='${password}'`;
        response = await connection.query(query);
        await connection.end();
        return response;
    }

    return {
        login,
        register
    };
};
