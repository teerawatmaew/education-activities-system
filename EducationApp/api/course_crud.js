// JavaScript source code
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

module.exports = function (app) {
    // show all courses
    app.get('/courses', function (req, res) {
        connection.query('SELECT * FROM courses', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'courses list.' });
        });
    });

    // show course id n
    app.get('/courses/:id', function (req, res) {
        let course_id = req.params.id;
        if (!course_id) {
            return res.status(400).send({ error: true, message: 'Please provide course_id' });
        }
        connection.query('SELECT * FROM courses where id=?', course_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results[0], message: 'courses list.' });
        });
    });

    // add new course
    app.post('/course', function (req, res) {
        let course_name = req.body.course_name;
        if (!course_name) {
            return res.status(400).send({ error: true, message: 'Please provide course' });
        }
        connection.query("INSERT INTO courses SET ? ", { course_name: course_name }, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'New course has been created successfully.' });
        });
    });

    //  Update course with id
    app.put('/course', function (req, res) {
        let course_id = req.body.course_id;
        let course_name = req.body.course_name;
        if (!course_id || !course_name) {
            return res.status(400).send({ error: user, message: 'Please provide course_name and course_id' });
        }
        connection.query("UPDATE courses SET course_name = ? WHERE id = ?", [course_name, course_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Course has been updated successfully.' });
        });
    });

    //  Delete user
    app.delete('/course', function (req, res) {
        let course_id = req.body.course_id;
        if (!course_id) {
            return res.status(400).send({ error: true, message: 'Please provide course_id' });
        }
        connection.query('DELETE FROM courses WHERE id = ?', [course_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Course has been updated successfully.' });
        });
    }); 
}