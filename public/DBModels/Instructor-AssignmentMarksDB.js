const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let AssignmentMarks = new Schema({
    assignmentName: String,
    marks: String ,
    assignmentID: String     
});

module.exports = mongoose.model('AssignmentMarks', AssignmentMarks, 'AssignmentMarks');