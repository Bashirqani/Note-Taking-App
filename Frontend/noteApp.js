const API_URL = "http://localhost:5000/api/notes"; 
const AUTH_URL = "http://localhost:5000/api/auth"; 



// Function to display messages (success or error)
function showMessage(message, type = "success") {
    const messageBox = document.getElementById("message-Box");

    messageBox.textContent = message; 
    messageBox.className = `message ${type === "error" ? "error" : "success"}`; 
    messageBox.style.display = "block"; 

    // Hide message after 3 seconds
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

// Function to toggle password visibility
function togglePassword(inputId, textId) {
    const passwordInput = document.getElementById(inputId);
    const showText = document.querySelector(`[onclick="togglePassword('${inputId}', '${textId}')"]`);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showText.textContent = "Hide password";
    } else {
        passwordInput.type = "password";
        showText.textContent = "Show password";
    }
}

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await loginUser();
});

// Initialize app when the page loads
document.addEventListener("DOMContentLoaded", () => {
    checkAuth(); // Check if the user is logged in

    const token = localStorage.getItem("token");

    if (token) {
        document.body.classList.add("app-style"); 
        document.body.classList.remove("login-style");      
    } else {
        document.body.classList.add("login-style"); 
        document.body.classList.remove("app-style"); 
    }

    // Hide delete confirmation modal by default
    document.getElementById("deleteModal").style.display = "none";

    // Logout button event listener
    const logoutBtn = document.getElementById("logout-Btn"); 
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // Add note form event listener
    document.getElementById("noteForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        await addNote();
    });
});

// Handle registration form submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const response = await fetch(`${AUTH_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) throw new Error("Failed to register");

        showMessage("Registration successful! You can now log in.");
        document.getElementById("registerForm").reset();
    } catch (error) {
        showMessage("Registration failed.", "error");
    }
});

// Function to log in the user
async function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.token); // Store token

        showMessage("Login successful!");
        document.body.classList.remove("login-style");
        document.body.classList.add("app-style"); 
        checkAuth(); // Load notes after login
    } catch (error) {
        showMessage("Login failed. Check your credentials.", "error");
    }
}

// Function to check if the user is authenticated
function checkAuth() {
    const token = localStorage.getItem("token");

    if (token) {
        document.getElementById("register-section").style.display = "none";
        document.getElementById("login-section").style.display = "none";
        document.getElementById("add-note-section").style.display = "block";
        document.getElementById("note-section").style.display = "block";
        document.querySelector("footer").style.display = "block"; 
        fetchNotes();
    } else {
        showLogin();  
        document.getElementById("add-note-section").style.display = "none";
        document.getElementById("note-section").style.display = "none";
        document.querySelector("footer").style.display = "none"; 
    }
}

// Function to log out the user
function logout() {
    localStorage.removeItem("token");
    showMessage("Logged out successfully!", "success");
    setTimeout(() => location.reload(), 1500); // Reload page after logout
}

// Function to show login form
function showLogin() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// Function to show registration form
function showRegister() {
    document.getElementById("register-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
}

// Fetch notes from API
async function fetchNotes() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch notes");

        const notes = await response.json();
        displayNotes(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
}

// Function to add a new note
async function addNote() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const token = localStorage.getItem("token");

    // Count words in the description
    const wordCount = description.split(/\s+/).filter(word => word.length > 0).length;

    if (wordCount < 5) {
        showMessage("Please enter at least 5 words in the description.", "error");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, completed: false }),
        });

        if (!response.ok) throw new Error("Failed to add note");

        document.getElementById("noteForm").reset();
        fetchNotes();
        showMessage("Note added successfully!", "success");
    } catch (error) {
        showMessage("Failed to add note.", "error");
    }
}

// Function to show delete confirmation modal
function confirmDeleteNote(id) {
    noteToDelete = id;
    document.getElementById("deleteModal").style.display = "flex";
}

// Close modal when "No" is clicked
document.getElementById("cancelDelete").addEventListener("click", () => {
    document.getElementById("deleteModal").style.display = "none";
    noteToDelete = null; 
});

// Delete note when "Yes" is clicked
document.getElementById("confirmDelete").addEventListener("click", async () => {
    if (!noteToDelete) return;

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`http://localhost:5000/api/notes/${noteToDelete}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to delete note");

        showMessage("Note deleted successfully!", "success");
        document.getElementById("deleteModal").style.display = "none";
        fetchNotes(); // Refresh notes
    } catch (error) {
        showMessage("Failed to delete note.", "error");
    }
});

// Function to display notes
function displayNotes(notes) {
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <small>${new Date(note.createdAt).toLocaleString()}</small>
            <button class="delete-Btn" onclick="confirmDeleteNote('${note._id}')">Delete</button>
        `;

        notesContainer.appendChild(noteElement);
    });
}



