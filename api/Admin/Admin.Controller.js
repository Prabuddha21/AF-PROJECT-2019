const mongoose = require('../DBSchema/SchemaMapper');
const AdminSchema = mongoose.model('Admin');
const NoticeSchema = mongoose.model('Notice');
const InstructorSchema = mongoose.model('Instructor');
const CourseSchema = mongoose.model('Course');
const SubjectSchema = mongoose.model('Subject');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('./NodeMailer');

//used for encryption and decryption
process.env.SECRET_KEY = "secret";

const AdminController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.findOne({email: data.email}).then(item => {
                if(!item){
                    bcrypt.hash(data.password, 10, (err, hash) => {

                        const newAdmin = new AdminSchema({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            NIC: data.NIC,
                            password: hash,
                            email: data.email,
                            contactNumber: data.contactNumber
                        });

                        newAdmin.save().then(() => {
                            const mail = {
                                email: data.email,
                                subject: "Added To The System",
                                body: `<p>This mail is sent to confirm you that you have been added as an Administrator for the system.</p>
                                    <br>
                                    <p><b>Credentials: </b></p>
                                    <p>Username: ${data.email}  password: ${data.password}</p>`
                            };
                            nodeMailer.sendMail(mail);
                            resolve({status: 200, message: "Admin added to the system."})
                        }).catch( err => {
                            reject({status: 500, message: "Error: " + err});
                        });
                    });
                } else {
                    reject({status: 200, message: "Email is already in use."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.insertInstructor = (data) => {
        return new Promise((resolve, reject) => {
            InstructorSchema.findOne({email: data.email}).then(item => {
                if(!item){
                    bcrypt.hash(data.password, 10, (err, hash) => {

                        const newInstructor = new InstructorSchema({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            designation: data.designation,
                            faculty: data.faculty,
                            password: hash,
                            email: data.email,
                            contactNumber: data.contactNumber
                        });

                        newInstructor.save().then(() => {
                            const mail = {
                                email: data.email,
                                subject: "Added To The System",
                                body: `<p>This mail is sent to confirm you that you have been added as an Instructor for the system.</p>
                                    <br>
                                    <p><b>Credentials: </b></p>
                                    <p>Username: ${data.email}  password: ${data.password}</p>`
                            };
                            nodeMailer.sendMail(mail);
                            resolve({status: 200, message: "Instructor added to the system."});
                        }).catch( err => {
                            reject({status: 500, message: "Error: " + err});
                        });
                    });
                } else {
                    reject({status: 200, message: "Email is already in use."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.insertCourse = (data) => {
      return new Promise((resolve, reject) => {
          CourseSchema.findOne({code: data.code}).then(item => {
              if(!item) {
                  const newCourse = new CourseSchema({
                      code: data.code,
                      name: data.name,
                      years: data.years,
                      description: data.description
                  });

                  newCourse.save().then(() => {
                      resolve({status: 200, message: "Course added to the system."})
                  }).catch( err => {
                      reject({status: 500, message: "Error: " + err});
                  });
              } else {
                  reject({status: 200, message: "Course Code is already in use"});
              }
          }).catch(err => {
              reject({status: 500, message: "Error: " + err});
          });
      })
    };

    this.insertCourse = (data) => {
        return new Promise((resolve, reject) => {
            CourseSchema.findOne({code: data.code}).then(item => {
                if(!item) {
                    const newCourse = new CourseSchema({
                        code: data.code,
                        name: data.name,
                        years: data.years,
                        description: data.description
                    });

                    newCourse.save().then(() => {
                        resolve({status: 200, message: "Course added to the system."})
                    }).catch( err => {
                        reject({status: 500, message: "Error: " + err});
                    });
                } else {
                    reject({status: 200, message: "Course Code is already in use"});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

    this.insertSubject = (data) => {
        return new Promise((resolve, reject) => {
            SubjectSchema.findOne({code: data.code}).then(item => {
                if(!item) {
                    const newSubject = new SubjectSchema({
                        code: data.code,
                        name: data.name,
                        description: data.description,
                        instructors: data.instructors
                    });

                    newSubject.save().then((result) => {
                        if(data.courses !== ""){
                            const courseArray = data.courses;
                            courseArray.forEach(data => {
                                CourseSchema.updateOne(data, {$push : {subjects: result._id}})
                                    .catch((err) => {
                                        reject({status: 500, message: "Error: " + err});
                                    });
                            });
                        }
                        resolve({status: 200, message: "Subject added to the system."})
                    }).catch( err => {
                        reject({status: 500, message: "Error: " + err});
                    });
                } else {
                    reject({status: 200, message: "Subject Code is already in use"});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.findOne({_id: data._id}).then(item => {
                if(item){
                    if(this.findEmail(data.email)) {
                        bcrypt.hash(data.password, 10, (err, hash) => {

                            let updateAdmin = {};
                            if(data.password == null || data.password == "") {
                                updateAdmin = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    NIC: data.NIC,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            } else {
                                updateAdmin = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    NIC: data.NIC,
                                    password: hash,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            }

                            AdminSchema.updateOne({_id: data._id}, updateAdmin).then(data => {
                                resolve({status: 200, message: "Update Successful."})
                            }).catch(err => {
                                reject({status: 500, message: "Error: " + err});
                            });
                        });
                    } else {
                        reject({status: 200, message: "Email Already In Use."});
                    }
                } else {
                    reject({status: 404, message: "Something went wrong."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.updateInstructor = (data) => {
        return new Promise((resolve, reject) => {
            InstructorSchema.findOne({_id: data._id}).then(item => {
                if(item){
                    if(this.findEmail(data.email)) {
                        bcrypt.hash(data.password, 10, (err, hash) => {

                            let updateInstructor = {};
                            if(data.password == null || data.password == "") {
                                updateInstructor = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    designation: data.designation,
                                    faculty: data.faculty,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            } else {
                                updateInstructor = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    designation: data.designation,
                                    faculty: data.faculty,
                                    password: hash,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            }

                            InstructorSchema.updateOne({_id: data._id}, updateInstructor).then(data => {
                                resolve({status: 200, message: "Update Successful."})
                            }).catch(err => {
                                reject({status: 500, message: "Error: " + err});
                            });
                        });
                    } else {
                        reject({status: 200, message: "Email Already In Use."});
                    }
                } else {
                    reject({status: 404, message: "Something went wrong."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.updateCourse = (data) => {
        return new Promise((resolve, reject) => {
            CourseSchema.findOne({_id: data._id}).then(item => {
                if(item){
                    var updateCourse = {};

                    CourseSchema.findOne({code: data.code}).then(course => {
                        if(course) {
                            if (course._id == data._id) {
                                updateCourse = {
                                    name: data.name,
                                    description: data.description,
                                    years: data.years,
                                    subjects: data.subjects
                                };

                                CourseSchema.updateOne({_id: data._id}, updateCourse).then(data => {
                                    resolve({status: 200, message: "Update Successful."})
                                }).catch(err => {
                                    reject({status: 500, message: "Error: " + err});
                                });
                            } else {
                                reject({status: 500, message: "Course Code in use."});
                            }
                        } else {
                            updateCourse = {
                                code: data.code,
                                name: data.name,
                                description: data.description,
                                years: data.years,
                                subjects: data.subjects
                            };

                            CourseSchema.updateOne({_id: data._id}, updateCourse).then(data => {
                                resolve({status: 200, message: "Update Successful."})
                            }).catch(err => {
                                reject({status: 500, message: "Error: " + err});
                            });
                        }
                    });
                } else {
                    reject({status: 404, message: "Something went wrong."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.updateSubject = (data) => {
        return new Promise((resolve, reject) => {
            SubjectSchema.findOne({_id: data._id}).then(item => {
                if(item){
                    var updateSubject = {};

                    SubjectSchema.findOne({code: data.code}).then(subject => {
                        if(subject) {
                            if (subject._id == data._id) {
                                updateSubject = {
                                    name: data.name,
                                    description: data.description,
                                    instructors: data.instructors
                                };

                                SubjectSchema.updateOne({_id: data._id}, updateSubject).then(data => {
                                    resolve({status: 200, message: "Update Successful."})
                                }).catch(err => {
                                    reject({status: 500, message: "Error: " + err});
                                });
                            } else {
                                reject({status: 500, message: "Subject Code in use."});
                            }
                        } else {
                            updateSubject = {
                                code: data.code,
                                name: data.name,
                                description: data.description,
                                instructors: data.instructors
                            };

                            SubjectSchema.updateOne({_id: data._id}, updateSubject).then(data => {
                                resolve({status: 200, message: "Update Successful."})
                            }).catch(err => {
                                reject({status: 500, message: "Error: " + err});
                            });
                        }
                    });
                } else {
                    reject({status: 404, message: "Something went wrong."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.select = (data) => {
        return new Promise((resolve, reject) => {
            const decoded = jwt.verify(data.token, process.env.SECRET_KEY);
            AdminSchema.findOne({_id: decoded._id}).then(admin => {
                if(admin){
                    resolve({status: 200, data: admin});
                } else {
                    reject({status: 404, message: "Admin does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.selectInstructor = (data) => {
        return new Promise((resolve, reject) => {
            const email = data.email;
            InstructorSchema.findOne({email: email}).then(item => {
                if(item){
                    resolve({status: 200, data: item});
                } else {
                    reject({status: 404, message: "Instructor does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.selectAllInstructors = () => {
        return new Promise((resolve, reject) => {
            InstructorSchema.find().then((data) => {
                resolve({status: 200, data: data})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.selectForLogin = (data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.findOne({email: data.email}).then(admin => {
                if(admin){
                    if(bcrypt.compareSync(data.password, admin.password)) {
                        const payload = {
                            _id: admin._id,
                            firstName: admin.firstName,
                            lastName: admin.lastName,
                            email: admin.email
                        };

                        let token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 1440});

                        resolve({status: 200, data: token});
                    } else {
                        reject({status: 404, message: "Incorrect Password"});
                    }
                } else {
                    reject({status: 404, message: "Admin does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.selectAllCourses = () => {
        return new Promise((resolve, reject) => {
            CourseSchema.find().then((data) => {
                resolve({status: 200, data: data})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

    this.selectAllSubjects = () => {
        return new Promise((resolve, reject) => {
            SubjectSchema.find().then((data) => {
                resolve({status: 200, data: data})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

    this.selectCourse = (data) => {
        return new Promise((resolve, reject) => {
            const code = data.code;
            CourseSchema.findOne({code: code}).then(item => {
                if(item){
                    resolve({status: 200, data: item});
                } else {
                    reject({status: 404, message: "Course does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.selectSubject = (data) => {
        return new Promise((resolve, reject) => {
            const code = data.code;
            SubjectSchema.findOne({code: code}).then(item => {
                if(item){
                    resolve({status: 200, data: item});
                } else {
                    reject({status: 404, message: "Subject does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.deleteCourse = (id) => {
        return new Promise((resolve, reject) => {
            CourseSchema.deleteOne({_id: id}).then(() => {
                resolve({status: 200, message: "Course Deleted."})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.deleteSubject = (id) => {
        return new Promise((resolve, reject) => {
            SubjectSchema.findById(id, (err, subject) => {
                CourseSchema.updateMany({subjects: subject._id},{$pull: {subjects: subject._id}}, err => {
                    if(err){
                        reject({status: 500, message: "Error: " + err});
                    } else {
                        SubjectSchema.deleteOne({_id: subject._id}).catch(err => {
                            reject({status: 500, message: "Error: " + err});
                        });
                        resolve({status: 200, message: "Subject Deleted."});
                    }
                })
            })
        });
    };

    this.deleteInstructor = (id) => {
        return new Promise((resolve, reject) => {
            InstructorSchema.findById(id, (err, instructor) => {
                SubjectSchema.updateMany({instructors: instructor._id},{$pull: {instructors: instructor._id}}, err => {
                    if(err){
                        reject({status: 500, message: "Error: " + err});
                    } else {
                        InstructorSchema.deleteOne({_id: instructor._id}).catch(err => {
                            reject({status: 500, message: "Error: " + err});
                        });
                        resolve({status: 200, message: "Instructor Deleted."});
                    }
                })
            })
        });
    };

    this.addNotice = (data) => {
        return new Promise((resolve, reject) => {
            const notice = new NoticeSchema({
                title: data.title,
                content: data.content,
                by: data.by
            });

            notice.save().then(() => {
                resolve({status: 200, message: "Notice Created."})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

    this.getNotice = () => {
        return new Promise((resolve, reject) => {
            NoticeSchema.find().limit(3).sort({'_id': -1}).then((data) => {
                resolve({status: 200, data: data})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

    this.deleteNotice = (data) => {
        return new Promise((resolve, reject) => {
            NoticeSchema.deleteOne({_id: data}).then(() => {
                resolve({status: 200, message: "Notice Deleted."})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.resetPassword = (data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.findOne({email: data.email}).then(admin => {
                if(admin){
                    const newPassword = this.randomPassword();
                    bcrypt.hash(newPassword, 10, (err, hash) => {

                        const mail = {
                            email: data.email,
                            subject: "Password Reset",
                            body: `<p>This mail is sent to confirm you that your password have been reset.</p>
                                    <br>
                                    <p><b>Credentials: </b></p>
                                    <p>New Password: ${newPassword}</p>`
                        };
                        nodeMailer.sendMail(mail);

                        AdminSchema.updateOne({email: data.email}, {password: hash}).then(data => {
                            resolve({status: 200, message: 'Your password have been reset. Check you email.'});
                        }).catch(err => {
                            reject({status: 500, message: "Error: " + err});
                        });
                    });
                } else {
                    reject({status: 404, message: "Admin does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    //util functions
    this.findEmail = (email) => {
        return AdminSchema.findOne({email: email}).then(data => {
            if(data){
                return false;
            } else {
                return true;
            }
        })
    };

    this.randomPassword = () => {
        var password = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(var i = 0; i < 6; i++){
            password += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        return password;
    }
};

module.exports = new AdminController();