//Read existing notes from local storage.
const getSavedNotes = function () {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// Save notes to local storage.
const saveNotes = function (notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list.
const removeNote = function (id) {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};
// Generate the DOM structure for a note.
const generateNoteDOM = function (note) {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");

  // Setup the remove note button
  button.textContent = "Delete";
  noteEl.appendChild(button);
  button.addEventListener("click", function () {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.appendChild(textEl);

  return noteEl;
};

// renderNotes shows the notes which match the search text i.e. the filtered notes.
//So the title text matches the filter / search text.
const renderNotes = function (notes, filters) {
  const filteredNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // Using innerHTML wipes out the div of any previous html before adding the filtered notes.
  // Whatever is in the quotes would be rendered to the div.
  document.querySelector("#notes").innerHTML = "";
  // The filtered note is appended to the empty div (#notes).
  filteredNotes.forEach(function (note) {
    const noteEl = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};
