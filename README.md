Features of my app.

Add new notes with a title and description.
Minimum 5 words required in the description to add a note.
Notes are displayed like sticky notes with different colors.
Delete confirmation modal before removing notes.



Setup Instructions. 

1️. Clone the Repository
git clone https://github.com/yourusername/note-taking-app.git
cd note-taking-app


2️. Install Dependencies
bash
Copy
Edit
npm install


3️. Set Up MongoDB
Make sure MongoDB is installed and running on your system.
Update your MongoDB connection URL inside app.js; 
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });


4️.  Run the Server
node server.js or npm start.

5️.  Open the App
Visit http://localhost:3000 in your browser.




API Endpoints

1. Add a Note
POST /addNote

Request (JSON)
{
  "title": "My Note",
  "description": "This is a sample note with more than 5 words."
}

Response
{
  "message": "Note added successfully",
  "note": {
    "_id": "650a7f1e6d8e9b002c5a1b23",
    "title": "My Note",
    "description": "This is a sample note with more than 5 words.",
    "createdAt": "2025-02-26T12:00:00.000Z"
  }
}


2. Get All Notes

GET /getNotes

Response
[
  {
    "_id": "650a7f1e6d8e9b002c5a1b23",
    "title": "My Note",
    "description": "This is a sample note with more than 5 words.",
    "createdAt": "2025-02-26T12:00:00.000Z"
  }
]

3. Delete a Note
DELETE /deleteNote/:id

Response
{
  "message": "Note deleted successfully"
}


Lessons and challenges i faced while building my note taking app.

Implementing CRUD operations with MongoDB taught me how to handle database interactions.
Ensuring form validation (minimum words requirement) improved my JavaScript skills.
Creating a modal confirmation for delete actions helped me learn more about event handling in javascript. 
Fixing CSS layout issues (sticky notes overlapping) made my understanding of Flexbox and Grid mcuh better and how implement them.
Debugging unexpected modal pop-ups after reload helped me improve my understanding on where the error occured and what not to do to prevent it.



