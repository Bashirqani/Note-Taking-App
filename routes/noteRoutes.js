const express = require('express'); 
const router = express.Router(); 
const {
    createNote,
    getNote, 
    getNoteById, 
    updateNote, 
    deleteNote, 
} = require('../controllers/noteControllers'); // imports all the controllers.
const { isAuthenticated } = require('../middlewares/Auth'); // importing the auth.js middleware. 
const { validateUserId } = require('../middlewares/validateUser'); // importing the validateuserId.js.



// Defining the routes. 
router.post('/', isAuthenticated, createNote); 
router.get('/', isAuthenticated, getNote); 
router.get('/:id', isAuthenticated, validateUserId, getNoteById); 
router.put('/:id', isAuthenticated, validateUserId,updateNote); 
router.delete('/:id', isAuthenticated, validateUserId, deleteNote); 

module.exports = router; 