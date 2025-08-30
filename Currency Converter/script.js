"use strict";
const baseCurrency = document.getElementById("base-currency");
const targetCurrency = document.getElementById("target-currency");
const dateInput = document.getElementById("date-input");
const amount = document.getElementById("amount-input");
const result = document.querySelector(".result");

// Create list of currencies
async function getCurrencies() {
  const url = `https://api.frankfurter.dev/v1/currencies`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    const resultArr = Object.keys(result);
    // Fill options
    const optionsHtml = resultArr
      .map((currency) => {
        return `<option value=${currency}>${currency}</option>`;
      })
      .join("");
    baseCurrency.innerHTML = optionsHtml;
    targetCurrency.innerHTML = optionsHtml;
    baseCurrency.value = "USD";
    targetCurrency.value = "EUR";
    // Set default date
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const today = `${year}-${month}-${day}`;
    dateInput.value = today;
    buildUrl();

    // Get date
    dateInput.addEventListener("change", buildUrl);
    // Get Base currency
    baseCurrency.addEventListener("change", buildUrl);
    // Get Target currency
    targetCurrency.addEventListener("change", buildUrl);
    //  Get amount
    amount.addEventListener("input", buildUrl);
  } catch (error) {
    console.error(error.message);
  }
}
getCurrencies();

// Build URL
async function buildUrl() {
  const selectedDate = dateInput.value;
  const baseCur = baseCurrency.value;
  const targetCur = targetCurrency.value;
  if (!selectedDate || !baseCur || !targetCur) return;
  const url = `https://api.frankfurter.dev/v1/${selectedDate}?base=${baseCur}&symbols=${targetCur}`;
  try {
    if (baseCur === targetCur) {
      result.textContent = "Select a currency different from the base ";
      return;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    const rates = data.rates[targetCur];
    // Guard Clause 1: Check for empty or whitespace-only input
    if (amount.value.trim() === "") {
      result.textContent = ""; // Clear the result display
      return; // Stop execution
    }
    // Guard Clause 2: Check if the input is not a valid number
    if (isNaN(amount.value)) {
      result.textContent = "Invalid Number!";
      return; // Stop execution
    }
    const total = (rates * Number(amount.value)).toFixed(2);
    result.textContent = total;
  } catch (error) {
    console.log(error.message);
  }
}
