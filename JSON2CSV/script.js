// Select the necessary elements from the DOM
const jsonInput = document.getElementById("json-input");
const convertBtn = document.getElementById("convert-btn");
const messageContainer = document.getElementById("message-container");
const csvOutput = document.getElementById("csv-output");

// Add a click event listener to the convert button
convertBtn.addEventListener("click", function (event) {
  // Prevent the form from submitting and reloading the page
  event.preventDefault();

  const jsonString = jsonInput.value;

  // Clear previous results and messages
  csvOutput.value = "";
  messageContainer.textContent = "";

  // Check if the input is empty before trying to parse
  if (!jsonString.trim()) {
    messageContainer.textContent = "Error: Input cannot be empty.";
    return;
  }

  try {
    // 1. Attempt to parse the JSON string
    const data = JSON.parse(jsonString);

    // 2. Validate the parsed data
    if (!Array.isArray(data) || data.length === 0) {
      messageContainer.textContent =
        "Error: JSON must be a non-empty array of objects.";
      return;
    }

    // 3. Get headers from the first object's keys
    const headers = Object.keys(data[0]);

    console.log("Headers extracted successfully:", headers);

    // (Next steps for creating CSV rows will go here)
  } catch (error) {
    // If JSON.parse() fails, this block will run
    console.error("Invalid JSON:", error.message);
    messageContainer.textContent = "Error: The text is not valid JSON.";
  }
});
