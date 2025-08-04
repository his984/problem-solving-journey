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
  if (csv.trim() !== "") {
    const lines = csv.split("\n");
    const [headerLine, ...contentLines] = lines;
    const headerLineArray = headerLine.split(",");
    const finalJsonArray = [];

    for (const line of contentLines) {
      if (line.trim() === "") return;
      const values = line.split(",");
      // ------------------------------------------------
      if (headerLineArray.length != values.length) {
        messageContainer.textContent = `Format error ${values.length} columns, but the header has ${headerLineArray.length}.`;
        jsonTextarea.textContent = "";
        return;
      }
      const obj = {};
      for (let i = 0; i < headerLineArray.length; i++) {
        obj[headerLineArray[i]] = values[i];
      }
      finalJsonArray.push(obj);
    }
    messageContainer.textContent = "";
    jsonTextarea.textContent = JSON.stringify(finalJsonArray, null, 2);
  } else {
    messageContainer.textContent = "CSV input cannot be empty!";
    messageContainer.className = "error-message";
  }
});

// Clear button
clearBtn.addEventListener("click", function () {
  messageContainer.textContent = "";
  jsonTextarea.value = "";
  csvTextarea.value = "";
});
