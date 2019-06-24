const express = require('express');
const admin = express.Router();
const AdminController = require('./Admin.Controller');

admin.post('/login', (req, res) => {
   AdminController.selectForLogin(req.body).then(data => {
       res.status(data.status).send(data.data);
   }).catch(err => {
       res.status(err.status).send(err.message);
   })
});

admin.post('/reset', (req, res) => {
    AdminController.resetPassword(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.post('/register', (req, res) => {
    AdminController.insert(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.post('/profile', (req, res) => {
    AdminController.select(req.body).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
});

admin.put('/update', (req, res) => {
    AdminController.update(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.get('/instructors', (req, res) => {
    AdminController.selectAllInstructors().then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    });
});

admin.post('/instructor/register', (req, res) => {
    AdminController.insertInstructor(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.put('/instructor/update', (req, res) => {
    AdminController.updateInstructor(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.delete('/instructor/delete/:id', (req, res) => {
    AdminController.deleteInstructor(req.params.id).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.post('/instructor/profile', (req, res) => {
    AdminController.selectInstructor(req.body).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
});

admin.post('/course/register', (req, res) => {
    AdminController.insertCourse(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.post('/course/search', (req, res) => {
    AdminController.selectCourse(req.body).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.put('/course/update', (req, res) => {
    AdminController.updateCourse(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.delete('/course/delete/:id', (req, res) => {
    AdminController.deleteCourse(req.params.id).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});


admin.get('/courses', (req, res) => {
    AdminController.selectAllCourses().then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    });
});

admin.post('/subject/register', (req, res) => {
    AdminController.insertSubject(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.put('/subject/update', (req, res) => {
    AdminController.updateSubject(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.delete('/subject/delete/:id', (req, res) => {
    AdminController.deleteSubject(req.params.id).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.post('/subject/search', (req, res) => {
    AdminController.selectSubject(req.body).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.get('/subjects', (req, res) => {
    AdminController.selectAllSubjects().then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    });
});

admin.post('/addnotice', (req, res) => {
    AdminController.addNotice(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.get('/getnotices', (req, res) => {
    AdminController.getNotice().then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.delete('/removenotice/:id', (req, res) => {
    AdminController.deleteNotice(req.params.id).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

module.exports = admin;