const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Notes")

//ROUTES 1: get all notes using GET: api/auth/getuser. login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

//ROUTES 2: add notes using POST: api/note/addnote. login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title, it must be 3 latter').isLength({ min: 3 }),
    body('description', 'Enter a valid description, it must be 10 letter').isLength({ min: 10 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are error, return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//ROUTES 3: update notes using PUT: api/auth/addnote. login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {   
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the node to be updated then update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note Not Found");
    }
    //if user is not autharise
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("You Are not Allowed");
    }
    //user is autherise and note id is present
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
});

//ROUTES 4: delete notes using DELETE: api/auth/deletenote. login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the node to be updated then update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        //if user is not autharise
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You Are not Allowed");
        }
        //user is autherise and note id is present
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Succes": "Notes has successfully deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router

