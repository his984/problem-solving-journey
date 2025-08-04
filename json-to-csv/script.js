// DOM Elements
const jsonTextarea = document.getElementById("json-textarea");
const csvTextarea = document.getElementById("csv-textarea");
const toJsonBtn = document.getElementById("to-json-btn");
const toCsvBtn = document.getElementById("to-csv-btn");
const clearBtn = document.getElementById("clear-btn");
const messageContainer = document.getElementById("message-container");
// CSV to JSON
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
// Check JSON content
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
// JSON to CSV
toCsvBtn.addEventListener("click", function () {
  const json = jsonTextarea.value;
  const checkJson = isValidJSON(json);
  if (checkJson === true) {
    const data = JSON.parse(json);
    const headerArray = data[0];
    const keys = Object.keys(headerArray);
    const headerStr = keys.join(",");
    const allDataRow = [];
    for (let obj of data) {
      const lines = Object.values(obj);
      const lineStr = lines.join(",");
      allDataRow.push(lineStr);
    }
    const dataBlock = allDataRow.join("\n");
    const finalCsvString = `${headerStr}\n${dataBlock}`;
    csvTextarea.value = finalCsvString;
  } else {
    messageContainer.textContent = `JSON format error!!`;
  }
});
