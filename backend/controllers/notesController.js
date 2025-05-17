const notesModel = require("../models/notesModel");

const createNote = async (req, res) =>{
  try {
    const {heading, content, date} = req.body;
    const newNote = await notesModel.createNote(heading, content, date);
     res.status(201).json({
        "message":"new note created",
        data:newNote
    })
  } catch (error) {
    throw(error);
  }
}
//update 
//use model.findOneAndUpdate(findone, update(data), {new:true})
const updateNote = async (req, res) => {
    try {
      const {heading, content } = req.body;
      const updatedNote = await notesModel.findByIdAndUpdate(req.params.id, {heading, content}, {new:true});
      res.status(201).json({
        "message":"note updated",
         updatenote:updatedNote
      })
    } catch (error) {
       throw(error);
    }

}
const deleteNote = async (req, res) =>{
  try {
    const deleteNote = await notesModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      "message":"note deleted",
       deletenote: deleteNote
    
    })
  } catch (error) {
    throw(error);
  }
}
const getAllNotes = async (req, res) =>{
  const userId = req.userId;
  
  const notes = await notesModel.find({userId});
  res.json(notes);
}
const getNoteById = async (req, res) =>{
    try {
        const note = await notesModel.findById(req.params.id);
        res.json(note);
    } catch (error) {
       throw(error);
    }
    
}
module.exports = {createNote, updateNote, deleteNote, getAllNotes, getNoteById};         