const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
    student_name:{
        type: String,
        default: ''
    },
    password:{
        type: String,
        default:''
    },
    Id:{
      type:String,
      default:''
    },
    course:{
        type: String,
        default:''
    },

    email:{
        type: String,
        default:''
    },
});

studentSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)
};

studentSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
};
module.exports = mongoose.model('student', studentSchema);