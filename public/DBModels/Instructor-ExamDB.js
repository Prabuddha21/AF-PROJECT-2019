const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let ExamDB = new Schema({
    assignmentName: String,
    assignmentDescription: String,
    courseName: String,
    assignmentDueDate: Date,
    isNewAssignment: Boolean    
});

module.exports = mongoose.model('ExamDB', ExamDB, 'ExamDB');