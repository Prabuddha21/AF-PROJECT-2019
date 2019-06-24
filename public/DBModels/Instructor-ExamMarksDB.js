const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let ExamMarks = new Schema({
    examName: String,
    marks: String ,
    examID: String     
});

module.exports = mongoose.model('ExamMarks', ExamMarks, 'ExamMarks');