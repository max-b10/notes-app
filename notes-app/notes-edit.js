// Setting the title input and text area body to variables:
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note");

// The note they clicked has their uuid substring (without the #)
// matched to the note.id. If it doesn't matched they are returned to index.html.
const noteId = location.hash.substring(1);

let notes = getSavedNotes();
let note = notes.find(function (note) {
  return note.id === noteId;
});
if (note === undefined) {
  location.assign("index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;

titleElement.addEventListener("input", function (e) {
  note.title = e.target.value;
  saveNotes(notes);
});
bodyElement.addEventListener("input", function (e) {
  note.body = e.target.value;
  saveNotes(notes);
});
removeElement.addEventListener("click", function (e) {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

// Syncing data across pages.
window.addEventListener("storage", function (e) {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find(function (note) {
      return note.id === noteId;
    });
    if (note === undefined) {
      location.assign("index.html");
    }
    titleElement.value = note.title;
    bodyElement.value = note.body;
  }
});
