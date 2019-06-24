const student = require('../../student');
const studentSession = require('../../studentSession')
const mongoose = require('mongoose');

module.exports = (app) =>{

    /*
        *signup
     */

    app.post('../components/student-signup', (req,res,next)=>{
        const{body} = req;
        const{
            student_name,
            password,
            email,
            course,
            }= body;

        let{
            Id
        }=body;

        if(!student_name){
            return res.send({
                success:false,
                message: 'Error: Student name cannot be blank'
            });
        }

        if(!password){
            return res.send({
                success:false,
                message: 'Error: Password cannot be blank'
            });
        }

        if(!Id){
            return res.send({
                success:false,
                message: 'Error: Student Id cannot be blank'
            });
        }

        if(!course){
            return res.send({
                success:false,
                message: 'Error: Course cannot be blank'
            });
        }

        if(!email){
            return res.send({
                success:false,
                message: 'Error: E-mail cannot be blank'
            });
        }

        /*email = email.toLowerCase();*/

        student.find({
            id:id
        },(err,previousStudents)=>{
            if(err){
                return res.send({
                    success:false,
                    message: 'Error: Server error'
                });
            }else if(previousStudents.length> 0){
                return res.send({
                    success:false,
                    message: 'Error: Account already exist'
                });
            }

            //save the new student

            const newStudent = new student();

            newStudent.email = email;
            newStudent.student_name= student_name;
            newStudent.password = newStudent.generateHash(password);
            newStudent.Id = Id;
            newStudent.course = course;
            newStudent.save((err,student) =>{
                if(err){
                    return res.send({
                        success:false,
                        message: 'Error: Server error'
                    });
                }

                return res.send({
                    success:true,
                    message:'Signed up'
                })
            })
        })
        })

    app.post('../components/student-login', (req,res,next)=>{
        const{body} = req;
        const{

            password,


        }= body;

        let{
            Id
        }=body;

        if(!Id){
            return res.send({
                success:false,
                message: 'Error: Student Id cannot be blank'
            });
        }

        if(!password){
            return res.send({
                success:false,
                message: 'Error: Password cannot be blank'
            });
        }
        student.find({
            id:id
        }((err,students) =>{
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: server error'
                })
            }
            if(students.length !=1){
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            }

            const student = students[0];
            if(!student.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Error: Invalid password'
                })
            }

            const studentSession = new studentSession()
            studentSession.student_Id = student._Id
            studentSession.save((err,doc) =>{
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    })
                }

                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                })
            })
        })
        )
    })

    app.get('api/account/verify',(req,res,next)=>{

        //get the token
        const {query} = req;

        const {token} = query;

        //token = test

        //verify the token

        studentSession.find({
            _id: token,
            isDeleted:  false
        }, (err,sessions) =>{
                if(err){
                    return res.send({
                        success:false,
                        message: 'Error: Server error '
                    })
                }

                if(sessions.length != 1){
                    return res.send({
                        success:false,
                        message: 'Error: Invalid '});
                    }else{
                        return res.send({
                            success:true,
                            message: 'No error! '
                        })
                    }
                })
        })
    });

    app.get('api/account/logout', (req,res,next) =>{
        //get the token
        const {query} = req;

        const {token} = query;

        //token = test

        //verify the token

        studentSession.findoneAndUpdate({
            _id: token,
            isDeleted: false
    },{
            $set:{
                isDeleted: true
            }

    },null,(err,sessions) =>{
            if(err){
                return res.send({
                    success:false,
                    message: 'Error: Server error '
                })
            }

                return res.send({
                        success:true,
                        message: 'No error! '
                    })
                })

    });
    app.get('../component/student/:Id',function (req,res) {
        student.findById(req.params.Id)
            .exec(function (err,student) {
                if(err){
                    console.log("Error" + err)
                }else{
                    res.json(student)
                }
            })
    })
}