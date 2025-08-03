// DOM Elements
const jsonTextarea = document.getElementById("json-textarea");
const csvTextarea = document.getElementById("csv-textarea");
const toJsonBtn = document.getElementById("to-json-btn");
const toCsvBtn = document.getElementById("to-csv-btn");
const clearBtn = document.getElementById("clear-btn");
const messageContainer = document.getElementById("message-container");

// toJsonBtn.addEventListener("click", function (event) {
//   event.preventDefault();

// });
const csvFile = `name,email,age,country
Loy,labramin0@mapquest.com,8,Russia

Stanislaw,slissenden1@amazonaws.com,18,Israel
Chrisse,cjeannel2@techcrunch.com,6,France`;

const lines = csvFile.split("\n");
const [headerLine, ...contentLines] = lines;
const headerLineArray = headerLine.split(",");

const finalJsonArray = [];
contentLines.forEach((line) => {
  if (line.trim() === "") return;
  const obj = {};
  const values = line.split(",");
  for (let i = 0; i < headerLineArray.length; i++) {
    obj[headerLineArray[i]] = values[i];
  }
  finalJsonArray.push(obj);
});

// console.log(finalJsonArray);
