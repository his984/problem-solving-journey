// Select the necessary elements from the DOM
const converterForm = document.getElementById('converter-form');
const binaryInput = document.getElementById('binary-input');
const resultDisplay = document.getElementById('result-display');

// Listen for the form submission event
converterForm.addEventListener('submit', function(event) {
    // Prevent the default form behavior (page reload)
    event.preventDefault();

    const binaryValue = binaryInput.value;

    // --- 1. Input Validation ---
    
    // Reset any previous error styling
    resultDisplay.classList.remove('error');

    // Check for empty input
    if (binaryValue === "") {
        resultDisplay.textContent = "Please enter a value.";
        resultDisplay.classList.add('error');
        return; // Stop the function
    }

    // Check for invalid characters (anything other than 0 or 1)
    for (const char of binaryValue) {
        if (char !== '0' && char !== '1') {
            resultDisplay.textContent = "Error: Please enter only 0s and 1s.";
            resultDisplay.classList.add('error');
            return; // Stop the function
        }
    }

    // --- 2. Conversion Logic ---

    let decimalValue = 0;
    let power = 0;

    // Loop through the binary string from RIGHT to LEFT
    for (let i = binaryValue.length - 1; i >= 0; i--) {
        // If the current digit is '1', add its place value (2^power) to the total
        if (binaryValue[i] === '1') {
            decimalValue += Math.pow(2, power);
        }
        
        // Increment the power for the next position
        power++;
    }

    // --- 3. Display the Result ---
    resultDisplay.textContent = `Decimal Result: ${decimalValue}`;
});