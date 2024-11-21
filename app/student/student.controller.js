const mysql = require('mysql2/promise');

module.exports = (dbConnection) => {
    const getLeaderboard = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "select student.id, student.first_name, student.last_name, sum(score) as total_score from student join score on student.id = score.student_id group by student.id order by total_score desc";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getStudent = async () => {
        const connection = await mysql.createConnection(dbConnection);
        const query = "SELECT * FROM student";
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getStudentList = async (teacher_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `
        SELECT student.*

        FROM student

        WHERE id NOT IN (
            SELECT student_id
            FROM map_section_teacher_student
            WHERE teacher_id = ${teacher_id}
        )`;
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const saveStudentList = async (section_id, teacher_id, student_ids) => {

        const connection = await mysql.createConnection(dbConnection);
        let insertValues = "";

        student_ids.map((student_id, index) => {
            insertValues = insertValues + (index > 0 ? ',' : '') + `(${section_id}, ${teacher_id}, ${student_id})`;
        })
        const deleteQuery = `DELETE FROM map_section_teacher_student WHERE teacher_id = ${teacher_id} AND section_id = ${section_id};`
        await connection.query(deleteQuery);
        const query = `
        INSERT INTO map_section_teacher_student(section_id, teacher_id, student_id)
        VALUES ${insertValues}
        `;
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    const getStudentFeedback = async (teacher_id) => {
        const connection = await mysql.createConnection(dbConnection);
        const query = `
        SELECT student.*

        FROM student

        WHERE id IN (
            SELECT student_id
            FROM map_section_teacher_student
            WHERE teacher_id = ${teacher_id}
        )`;
        const response = await connection.query(query);
        await connection.end();
        return response;
    }
    return {
        getStudent,
        getLeaderboard,
        getStudentList,
        saveStudentList,
        getStudentFeedback
    };
};
