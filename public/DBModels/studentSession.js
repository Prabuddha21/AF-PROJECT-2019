const mongoose = require('mongoose')

const studentSessionSchema = new mongoose.Schema({
    student_Id:{
        type: Number,
        default: -1
    },

    timestamp:{
        type:Date,
        default: Date.now()
    },

    isDeleted:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('studentSession',studentSessionSchema)