const fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

module.exports = {
    addCourse: (request, response) => {
        var coursename = request.body.coursename;
        var supervisor = request.body.supervisor;
        var startdate = request.body.startdate;
        var place = request.body.place;
        var numberparticipants = request.body.numberparticipants;
        connection.query('SELECT * FROM courses WHERE username = ?', [coursename], function (error, results, fields) {
            if (results.length > 0) {
                response.redirect('admin-manage-courses.ejs');
            } else {
                connection.query('INSERT INTO courses(course_name, supervisor, start_date, place, number_participants) VALUES(?,?,?,?,?)', [coursename, supervisor, startdate, place, numberparticipants], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        response.redirect('admin-manage-courses.ejs');
                    }
                });
            }
        });
    },

    editCourse: (request, response) => {
        var courseid = request.params.id;
        var coursename = request.body.edit - coursename;
        var supervisor = request.body.edit - supervisor;
        var startdate = request.body.edit - startdate;
        var place = request.body.edit - place;
        var numberparticipants = request.body.edit - numberparticipants
        connection.query('SELECT * FROM courses WHERE username = ?', [username], function (error, results, fields) {
            if (results.length > 0) {
                response.redirect('../admin-manage-courses.ejs');
            } else {
                connection.query('UPDATE courses SET course_name=?, supervisor=?, start_date=?, place=?, number_participants=? WHERE id=?', [coursename, supervisor, startdate, place, numberparticipants, id], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        response.redirect('../admin-manage-courses.ejs');
                    }
                });
            }
        });
    },

    deleteCourse: (request, response) => {
        var courseid = request.params.id;
        connection.query('DELETE FROM courses WHERE course_id = ?', [courseid], function (err, result) {
            if (err) {
                throw err;
            } else {
                response.redirect('../admin-manage-courses.ejs');
            }
        });
    },

    deleteAllCourse: (request, response) => {
        connection.query('DELETE * FROM courses', function (err, result) {
            if (err) {
                response.redirect('admin-manage-courses.ejs')
            }
            else {
                request.flash('success', 'All courses deleted successfully!')
                response.redirect('admin-manage-courses.ejs')
            }
        });
    }
};
