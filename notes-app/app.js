const notes = [
  {
    title: "My next trip",
    body: "I would like to go to Spain",
  },
  {
    title: "Habits to work on",
    body: "Exercise. Eat a bit better.",
  },
  {
    title: "Office modification",
    body: "Get a new seat",
  },
];
// Creating a filter system. When user searches in the input field, the filtered notes will
// be appended to the empty div.
const filters = {
  searchText: "",
};
// A function to show the notes which match the search text
// i.e. the filtered notes. So the title text matches the filter/search text.
const renderNotes = function (notes, filters) {
  const filteredNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // Using innerHTML wipes out the div of any previous html before adding the filtered notes.
  // Whatever is in the quotes would be rendered to the div.
  document.querySelector("#notes").innerHTML = "";
  // The filtered note is appended to the empty div (#notes).
  filteredNotes.forEach(function (note) {
    const noteEl = document.createElement("p");
    noteEl.textContent = note.title;
    document.querySelector("#notes").appendChild(noteEl);
  });
};

// Calling renderNotes will present the latest notes and filters.
renderNotes(notes, filters);

// Add event listener click. Changes text content of the event target i.e. the button.
document.querySelector("#create-note").addEventListener("click", function (e) {
  e.target.textContent = "Clicked";
  // console.log("clicked");
  // console.log(e);
});
document.querySelector("#remove-notes").addEventListener("click", function (e) {
  e.target.textContent = "Clicked";
});
// The empty 'filters' object above is being filled with the user input value.
document.querySelector("#search-text").addEventListener("input", function (e) {
  // console.log(e.target.value);
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});
// const newPara = document.createElement("p");
// newPara.textContent = "This is a new element from JS";
// document.querySelector("body").appendChild(newPara);
// // Select (and remove) first p
// const p = document.querySelector("p");
// p.remove();
