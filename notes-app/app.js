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

const newPara = document.createElement("p");
newPara.textContent = "This is a new element from JS";
document.querySelector("body").appendChild(newPara);
// Select (and remove) first p
const p = document.querySelector("p");
p.remove();

// Select all. Also change text content.
const ps = document.querySelectorAll("p");

ps.forEach(function (p) {
  p.textContent = "blah blah blah";
  //   p.remove();
});
