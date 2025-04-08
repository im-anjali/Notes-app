const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.statics.creatUser = async function (name, email, password) {
    try {
        const user = new this({name, email, password});
        return user.save();
    } catch (error) {
        throw error;
    }
}
userSchema.statics.getUserByEMail = async function (email){
   try {
    return findOne({email})
   } catch (error) {
      throw error 
   }
}

