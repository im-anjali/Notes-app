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
    }
})
notesSchema.statics.createNote = async function(heading, content, date){
    try {
        const note = new this({heading, content, date});  
        note.save();
    } catch (error) {
        throw(error)
    }
}
module.exports = mongoose.model("Note", notesSchema)