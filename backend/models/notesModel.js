const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
   
    heading:{
       type:String,
         required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date
    },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
})
notesSchema.statics.createNote = async function(heading, content, date, userId) {
    try {
        const note = new this({ heading, content, date, userId });
        return await note.save();
    } catch (error) {
        throw(error);
    }
};

module.exports = mongoose.model("Note", notesSchema)