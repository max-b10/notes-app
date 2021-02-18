"use strict";

let notes = getSavedNotes();

const filters = {
  searchText: "",
};

// Calling renderNotes will present the latest notes and filters.
renderNotes(notes, filters);

// Add event listener click. Changes text content of the event target i.e. the button.
document.querySelector("#create-note").addEventListener("click", (e) => {
  // const timestamp = moment().valueOf();
  // e.target.textContent = "Clicked";
  //push an object onto notes array and save what's added to local storage.
  notes.push({
    id: uuidv4(),
    title: "",
    body: "",
    // createdAt: timestamp,
    // updatedAt: timestamp,
  });
  saveNotes(notes);
  location.assign(`/edit.html#${uuidv4()}`);
});

// The empty 'filters' object above is being filled with the user input value.
document.querySelector("#search-text").addEventListener("input", (e) => {
  // console.log(e.target.value);
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});
// document.querySelector("#filter-by").addEventListener("change", (e) => {
//   filters.sortBy = e.target.value;
//   renderNotes(notes, filters);
// });

// Syncing data across pages.
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});

//CRUD local storage operations:
// localStorage.setItem("location", "Cambridge");
// console.log(localStorage.getItem("location"));
// localStorage.removeItem("location");
// localStorage.clear();
// const user = {
//   name: "Bob",
//   age: 50,
// };
// // JSON. stringify takes in your array or object etc and returns it as a string.
// const userJSON = JSON.stringify(user);
// console.log(userJSON);
// localStorage.setItem("user", userJSON);
// converts the JSON into an Object. So you an use .notation to access the data
// (in a template string for example).
// const userJson = localStorage.getItem("user");
// const user = JSON.parse(userJson);
// console.log(`${user.name} is ${user.age}`);
// console.log(userJson);
