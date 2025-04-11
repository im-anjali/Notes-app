const express = require('express');
const router = express.Router();
const notesController = require("../controllers/notesController");

router.post('/createnote', notesController.createNote);
router.put('/updatenote/:id', notesController.updateNote);
router.delete('/deletenote/:id', notesController.deleteNote);
module.exports = router;