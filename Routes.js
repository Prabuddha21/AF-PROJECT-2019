const express = require('express');
const Router = express.Router();

const AdminRoute = require('./api/Admin/Admin.Route');
const InstructorRoute = require('./public/instructorRoutes');

Router.use('/administrator/', AdminRoute);
Router.use("/courseweb", InstructorRoute);

Router.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// Router.get('/admin', function (req, res) {
//     res.sendFile(__dirname + '/dist/index.html');
// });

module.exports = Router;