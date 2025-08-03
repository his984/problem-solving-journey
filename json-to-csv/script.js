// DOM Elements
const jsonTextarea = document.getElementById("json-textarea");
const csvTextarea = document.getElementById("csv-textarea");
const toJsonBtn = document.getElementById("to-json-btn");
const toCsvBtn = document.getElementById("to-csv-btn");
const clearBtn = document.getElementById("clear-btn");
const messageContainer = document.getElementById("message-container");
toJsonBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const csv = csvTextarea.value;
  const lines = csv.split("\n");
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
  jsonTextarea.textContent = JSON.stringify(finalJsonArray, null, 2);
});
