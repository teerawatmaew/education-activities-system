const fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

module.exports = {
    addUser: (request, response) => {
        var username = request.body.username;
        var password = request.body.password;
        var email = request.body.email;
        var userclass = request.body.userclass;
        connection.query('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email], function (error, results, fields) {
            if (results.length > 0) {
                response.redirect('admin-manage-users.ejs');
            } else {
                connection.query('INSERT INTO accounts(username, password, user_class, email) VALUES(?,?,?,?)', [username, password, userclass, email], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        response.redirect('admin-manage-users.ejs');
                    }
                });
            }
        });
    },

    editUser: (request, response) => {
        var id = request.params.id;
        var username = request.body.editusername;
        var password = request.body.editpassword;
        var email = request.body.editemail;
        var userclass = request.body.edituserclass;
        connection.query('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email], function (error, results, fields) {
            if (results.length > 1) {
                response.redirect('../admin-manage-users.ejs');
            } else {
                connection.query('UPDATE accounts SET username=?, password=?, user_class=?, email=? WHERE id=?', [username, password, userclass, email, id], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        response.redirect('../admin-manage-users.ejs');
                    }
                });
            }
        });
    },

    deleteUser: (request, response) => {
        var user = { id: request.params.id }
        connection.query('DELETE FROM accounts WHERE id = ' + request.params.id, user, function (err, result) {
            if (err) {
                throw err;
            } else {
                response.redirect('../admin-manage-users.ejs');
            }
        });
    },

    deleteAllUser: (request, response) => {
        connection.query('DELETE * FROM accounts', function (err, result) {
            if (err) {
                response.redirect('admin-manage-users.ejs')
            }
            else {
                request.flash('success', 'All user deleted successfully!')
                response.redirect('admin-manage-users.ejs')
            }
        });
    }
};
