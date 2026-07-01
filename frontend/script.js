const API_URL = "http://localhost:5000/api/notes";

const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

let editingId = null;

// Load all notes
async function loadNotes() {
  const response = await fetch(API_URL);
  const notes = await response.json();

  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    notesContainer.innerHTML += `
      <div class="note">
        <h3>${note.title}</h3>
        <p><strong>Category:</strong> ${note.category}</p>
        <p>${note.content}</p>

        <div class="actions">
          <button class="edit" onclick="editNote('${note._id}')">Edit</button>
          <button class="delete" onclick="deleteNote('${note._id}')">Delete</button>
        </div>
      </div>
    `;
  });
}

// Add or Update Note
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const note = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    content: document.getElementById("content").value,
  };

  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    editingId = null;
    noteForm.querySelector("button").textContent = "Add Note";
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  }

  noteForm.reset();
  loadNotes();
});

// Edit Note
async function editNote(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const note = await response.json();

  document.getElementById("title").value = note.title;
  document.getElementById("category").value = note.category;
  document.getElementById("content").value = note.content;

  editingId = id;
  noteForm.querySelector("button").textContent = "Update Note";
}

// Delete Note
async function deleteNote(id) {
  if (confirm("Delete this note?")) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    loadNotes();
  }
}

// Load notes when page opens
loadNotes();