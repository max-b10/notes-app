"use strict";

//Read existing notes from local storage.
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save notes to local storage.
const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list.
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a note.
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Setup the remove note button
  // button.textContent = "Delete";
  // noteEl.appendChild(button);
  // button.addEventListener("click", () => {
  //   removeNote(note.id);
  //   saveNotes(notes);
  //   renderNotes(notes, filters);
  // });

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  // Setup the link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  // Setup the status message
  // statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// renderNotes shows the notes which match the search text i.e. the filtered notes.
//So the title text matches the filter / search text.
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector("#notes");
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  // Using innerHTML wipes out the div of any previous html before adding the filtered notes.
  // Whatever is in the quotes would be rendered to the div.
  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    // The filtered note is appended to the empty div (#notes).
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    // If there's no notes to render, create an empty message para in its place.
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    // Add a class to elements created via the DOM (not via html):
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

// Generate the last edited message
// const generateLastEdited = (timestamp) => {
//   return `Last edited ${moment(timestamp).fromNow()}`;
// };
