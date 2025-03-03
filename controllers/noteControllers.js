const Note = require('../models/noteModel'); 

const createNote = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const note = await Note.create({
            title,
            description,
            completed,
            user: req.user.id, // Associate note with logged-in user
        });

        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// get all notes
const getNote = async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID
        const notes = await Note.find({ user: userId }); // Fetch only user's notes

        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Get a Note by ID
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const note = await Note.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete Note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createNote,
    getNote,
    getNoteById,
    updateNote,
    deleteNote,
};

  