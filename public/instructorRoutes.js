const express = require('express');
const router = express.Router();

const AssignmentDB = require("./DBModels/Instructor-AssignmentDb");
const CourseDB = require("./DBModels/Instructor-CourseDB");
const ExamDb = require("./DBModels/Instructor-ExamDB");
const InstructorDB = require("./DBModels/Instructor-InstructorDB");
const AssignmentMarksDB = require("./DBModels/Instructor-AssignmentMarksDB");
const ExamMarksDB = require("./DBModels/Instructor-ExamMarksDB");

//add a course - not my part though
router.route("/course/add").post((req, res) => {
    let instructorDB = new instructorDB(req.body);
    instructorDB
        .save()
        .then(bookDB => {
            res.status(200).send(`${bookDB} Added!`);
        })
        .catch(err => {
            res.status(400).send({ message: err });
        });
});

//get courses COUNT to-be accepted
router.route("/courses").get((req, res) => {
    CourseDB.countDocuments({ isNewCourse: true }, function(err, count) {
        if (err) throw err;
        res.status(200).send(`${count}`);
    });
});

//get all courses where isNewCourse = false, means already accepted
router.route("/courses/all").get((req, res) => {
    CourseDB.find({ isNewCourse: false }, (err, courses) => {
        if (err) throw err;
        res.status(200).send(courses);
    });
});

//get all courses where isNewCourse = true
router.route("/courses/all/accepted").get((req, res) => {
    CourseDB.find({ isNewCourse: true }, (err, courses) => {
        if (err) throw err;
        res.status(200).send(courses);
    });
});

//get a course by ID
router.route("/courses/update/:courseID").get((req, res) => {
    let id = req.params.courseID;
    CourseDB.findById(id, (err, course) => {
        if (err) throw err;
        if (!course) return res.status(400).send("No data found");
        res.status(200).send(course);
    });
});

//accept course - update isNewAssignment variable
router.route("/courses/accept/:id").post((req, res) => {
    let id = req.params.id;
    CourseDB.findById(id, (err, course) => {
        if (err) throw err;
        if (!course) return res.status(400).send("No data found");

        course.code = req.body.code;
        course.name = req.body.name;
        course.courseName = req.body.courseName;
        course.isNewCourse = req.body.isNewCourse;

        course
            .save()
            .then(course => {
                res.status(200).send("Data Updated: " + course);
            })
            .catch(err => {
                res.status(400).send("Error Occured: " + err);
            });
    });
});

// ASSIGNMENT RELATED CALLS ========================================================

//add an assignment
router.route("/assignment/add").post((req, res) => {
    let assignmentDb = new AssignmentDB(req.body);

    assignmentDb.save(function(err, records) {
        if (err) throw err;
        res.status(200).send(records._id); //should send the inserted documents _id
    });
});

//get all assignments
router.route("/assignments").get((req, res) => {
    AssignmentDB.find((err, assignments) => {
        if (err) throw err;
        res.status(200).send(assignments);
    });
});

//get assignment by ID
router.route("/assignments/update/:assignmentID").get((req, res) => {
    let id = req.params.assignmentID;
    AssignmentDB.findById(id, (err, assignment) => {
        if (err) throw err;
        if (!assignment) return res.status(400).send("No data found");
        res.status(200).send(assignment);
    });
});

//update assignment due date
router.route("/assignments/update/date/:assignmentID").post((req, res) => {
    let id = req.params.assignmentID;
    AssignmentDB.findById(id, (err, assignment) => {
        if (err) throw err;
        if (!assignment) return res.status(400).send("No data found");

        assignment.assignmentName = req.body.assignmentName;
        assignment.assignmentDescription = req.body.assignmentDescription;
        assignment.courseName = req.body.courseName;
        assignment.assignmentDueDate = req.body.assignmentDueDate;
        assignment.isNewAssignment = req.body.isNewAssignment;

        assignment
            .save()
            .then(assignment => {
                res.status(200).send("Data Updated: " + assignment);
            })
            .catch(err => {
                res.status(400).send("Error Occured: " + err);
            });
    });
});

//get last inserted id of the assignment - so _id can be inserted to CourseDB assignments array
var ObjectId = require("mongodb").ObjectID;
router.route("/last/inserted/assignment/:newID").post((req, res) => {
    let id = req.params.newID;
    let idd = id;

    let assignmentID = id.split("-", 1).toString();
    let courseID = idd.split("-")[1].toString();

    // res.status(200).send("assignment: " + assignmentID + "/ course: " + courseID);

    CourseDB.updateOne(
        { _id: ObjectId(courseID) },
        {
            $push: { assignments: assignmentID }
        },
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
});

//give assignment marks
router.route("/marks/assignments").post((req, res) => {
    let assignmentMarksDB = new AssignmentMarksDB(req.body);

    assignmentMarksDB
        .save()
        .then(assignment => {
            res.status(200).send(assignment);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// Exam RELATED CALLS ========================================================

//add an exam
router.route("/exam/add").post((req, res) => {
    let examDB = new ExamDb(req.body);

    examDB.save(function(err, records) {
        if (err) throw err;
        res.status(200).send(records._id); //should send the inserted documents _id
    });
});

//get all exams
router.route("/exams").get((req, res) => {
    ExamDb.find((err, assignments) => {
        if (err) throw err;
        res.status(200).send(assignments);
    });
});

//get exam by ID
router.route("/exams/update/:examID").get((req, res) => {
    let id = req.params.examID;
    ExamDb.findById(id, (err, exam) => {
        if (err) throw err;
        if (!exam) return res.status(400).send("No data found");
        res.status(200).send(exam);
    });
});

//update exam due date
router.route("/exams/update/date/:examID").post((req, res) => {
    let id = req.params.examID;
    ExamDb.findById(id, (err, exam) => {
        if (err) throw err;
        if (!exam) return res.status(400).send("No data found");

        exam.assignmentName = req.body.assignmentName;
        exam.assignmentDescription = req.body.assignmentDescription;
        exam.courseName = req.body.courseName;
        exam.assignmentDueDate = req.body.assignmentDueDate;
        exam.isNewAssignment = req.body.isNewAssignment;

        exam
            .save()
            .then(exam => {
                res.status(200).send("Data Updated: " + exam);
            })
            .catch(err => {
                res.status(400).send("Error Occured: " + err);
            });
    });
});

//get last inserted id of the exam - so _id can be inserted to CourseDB exams array
var ObjectId = require("mongodb").ObjectID;
router.route("/last/inserted/exam/:newID").post((req, res) => {
    let id = req.params.newID;
    let idd = id;

    let examID = id.split("-", 1).toString();
    let courseID = idd.split("-")[1].toString();

    CourseDB.updateOne(
        { _id: ObjectId(courseID) },
        {
            $push: { exams: examID }
        },
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
});

//give exam marks
router.route("/marks/exams").post((req, res) => {
    let examMarksDB = new ExamMarksDB(req.body);

    examMarksDB
        .save()
        .then(exam => {
            res.status(200).send(exam);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

//validate instructor username and email
router.route("/instructor/validate/:usernamePassword").post((req, res) => {
    let id = req.params.usernamePassword;
    let idd = id;

    let username = id.split("-", 1).toString();
    let password = idd.split("-")[1].toString();

    InstructorDB.find({email: username}, (err, data) => {
        if (err) throw err;

        passwordData = data.password;

        if (password == passwordData) {
            res.status(200).send("id is: " + data._id);
        } else {
            res.status(400).send("nottttt found");
        }
    });
});

module.exports = router;