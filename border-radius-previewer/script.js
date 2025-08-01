// An array of the corner IDs to easily loop through them.
const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];

// Cache the preview box element so we don't have to select it every time.
const previewBox = document.querySelector(".preview-box");

/**
 * A single function to update all UI elements at once.
 * It reads all slider values and updates the numeric displays and the preview box style.
 */
function updateUI() {
  // An empty array to collect the CSS values (e.g., "50px").
  let valuesArray = [];

  // Loop through each corner ID from our array.
  for (const cornerId of corners) {
    // Find the corresponding slider and span elements for the current corner.
    const slider = document.getElementById(cornerId);
    const valueSpan = document.getElementById(cornerId + "-value");

    // 1. Update the number display next to the slider (e.g., "50px").
    valueSpan.textContent = slider.value + "px";

    // 2. Add the value to our array for the final CSS rule.
    valuesArray.push(slider.value + "px");
  }

  // 3. Join the array values into a single string (e.g., "50px 20px ...").
  const finalCssValue = valuesArray.join(" ");

  // 4. Apply the final CSS string to the preview box's border-radius style.
  previewBox.style.borderRadius = finalCssValue;
}

// --- SETUP ---
// This code runs once when the page loads to set up the event listeners.

corners.forEach((corner) => {
  const range = document.getElementById(corner);
  // For each slider, add a listener that calls the main update function on any input.
  range.addEventListener("input", updateUI);
});

// Call the function once on page load to set the correct initial state.
updateUI();
