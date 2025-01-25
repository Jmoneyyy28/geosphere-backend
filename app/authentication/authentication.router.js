const express = require('express');

module.exports = (route, controller) => {    
    route.use('/authentication', express.Router()
        .post('/login', async (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            const [rows, fields] = await controller.login(username, password)
            res.send( rows)
        })
        .post('/register', async (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const idnumber = req.body.idnumber;
            const section = req.body.section;
            const [rows, fields] = await controller.register(username, password, firstName,lastName,idnumber,section)
            res.send('Success');
        }));

        

    return route;
};
