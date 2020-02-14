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
        var category = request.body.category;
        var credit = request.body.credit;
        connection.query('SELECT * FROM courses WHERE course_name = ?', [coursename], function (error, results, fields) {
            if (results.length > 0) {
                response.redirect('admin-manage-courses.ejs');
            } else {
                connection.query('INSERT INTO courses(course_name, category, credit) VALUES(?,?,?)', [coursename, category, credit], (err, result) => {
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
        var coursename = request.body.edit-coursename;
        var category = request.body.edit-category;
        var credit = request.body.edit-credit;
        connection.query('SELECT * FROM courses WHERE course_id = ?', [courseid], function (error, results, fields) {
            if (results.length > 1) {
                response.redirect('../admin-manage-courses.ejs');
            } else {
                connection.query('UPDATE courses SET course_name=?, category=?, credit=? WHERE course_id=?', [coursename, category, credit, courseid], (err, result) => {
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
