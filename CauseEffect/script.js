"use strict";

const namesList = document.querySelector(".names-list");
const personInfo = document.querySelector(".person-info");

const data = [
  {
    id: 1,
    first_name: "Janifer",
    last_name: "Cottle",
    email: "jcottle0@census.gov",
    gender: "Female",
  },
  {
    id: 2,
    first_name: "Flora",
    last_name: "Aggus",
    email: "faggus1@quantcast.com",
    gender: "Female",
  },
  {
    id: 3,
    first_name: "Constantin",
    last_name: "Theze",
    email: "ctheze2@imdb.com",
    gender: "Male",
  },
  {
    id: 4,
    first_name: "Eal",
    last_name: "Antoney",
    email: "eantoney3@goo.gl",
    gender: "Male",
  },
  {
    id: 5,
    first_name: "Cindie",
    last_name: "Baxstar",
    email: "cbaxstar4@fema.gov",
    gender: "Non-binary",
  },
  {
    id: 6,
    first_name: "Bevan",
    last_name: "Henric",
    email: "bhenric5@hao123.com",
    gender: "Male",
  },
];

/**
 * Renders the list of names on the screen based on the current 'data' array.
 */
function renderNames() {
  const namesHTML = data
    .map((person, index) => {
      return `<p class="person-name" data-index="${index}"> ${person.first_name}</p>`;
    })
    .join(""); // Join all the strings into one

  namesList.innerHTML = namesHTML; // Update the DOM only once
}

/**
 * Displays the details of a specific person in the info pane.
 * @param {number} index The index of the person in the data array.
 */
function displayPersonDetails(index) {
  const person = data[index];
  personInfo.innerHTML = `
    <h3>${person.first_name} ${person.last_name}</h3>
    <p>Id: ${person.id}</p>
    <p>Email: ${person.email}</p>
    <p>Gender: ${person.gender}</p>
  `;
}

// --- EVENT LISTENERS ---
namesList.addEventListener("click", function (event) {
  const clickedPerson = event.target.closest(".person-name");

  if (clickedPerson) {
    // Step 1: Get the index from the element that was clicked.
    const index = parseInt(clickedPerson.dataset.index, 10);

    // Step 2: Call the function responsible for displaying the details.
    displayPersonDetails(index);
  }
});

// --- INITIAL LOAD ---
// Render the initial list when the page loads.
renderNames();
