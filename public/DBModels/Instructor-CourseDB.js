const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let CourseDB = new Schema({
    code: String,
    name: String,
    subject: String , 
    isNewCourse: Boolean, 
    assignments: [String],
    exams: [String]
});

module.exports = mongoose.model('CourseDB', CourseDB, 'CourseDB');