const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let AssignmentDB = new Schema({
    assignmentName: String,
    assignmentDescription: String,
    courseName: String,
    assignmentDueDate: Date,
    isNewAssignment: Boolean    
});

module.exports = mongoose.model('AssignmentDB', AssignmentDB, 'AssignmentDB');