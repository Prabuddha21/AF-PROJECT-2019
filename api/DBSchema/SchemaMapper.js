const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const InstructorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    faculty: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
});

const CourseSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    years: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    isEnabled: {
        type: Boolean,
        default: false
    }
});

const SubjectSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructors: [{
        type: Schema.Types.ObjectId,
        ref: 'Instructor'
    }],
    assignments: [{
        type: String
    }],
    exams: [{
        type: String
    }]
});

const NoticeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    by: {
        type: String,
        required: true
    }
});

mongoose.model('Admin', AdminSchema);
mongoose.model('Instructor', InstructorSchema);
mongoose.model('Course', CourseSchema);
mongoose.model('Subject', SubjectSchema);
mongoose.model('Notice', NoticeSchema);

mongoose.connect('mongodb://localhost:27017/afproject', { useNewUrlParser: true}, err => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to the database');
});

module.exports = mongoose;