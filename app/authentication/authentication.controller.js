const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const register = async (username, password, firstName, lastName, idnumber, section) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `INSERT INTO student (username, password, first_name, last_name, id_number) values ('${username}', '${password}', '${firstName}','${lastName}','${idnumber}');`;
        response = await connection.query(query);
        const sectionQuery = `insert into map_section_teacher_student (student_id, section_id) values ((select id from student where username = '${username}'), (select id from section where section_name = '${section}'))`;
        response = await connection.query(sectionQuery);
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
