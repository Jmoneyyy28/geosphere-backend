const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const register = async (username, password, firstName, lastName, idnumber) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `INSERT INTO students (username, password, first_name, last_name, id_number) values ('${username}', '${password}', '${firstName}','${lastName}','${idnumber}')`;
        return await connection.query(query);
    }
    const login = async (username, password) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `SELECT * FROM students WHERE username='${username}' AND password='${password}'`;
        return await connection.query(query);
    }

    return {
        login,
        register
    };
};
