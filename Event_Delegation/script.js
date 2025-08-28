"use strict";
const btns = document.querySelector(".btns");
const btnValue = document.querySelector(".btn-value");
const btnIndex = document.querySelector(".btn-index");

// If you use matches: the clicked element itself must be the button.

// If you use closest: even if you click on something inside the button (like <span> or <svg>), closest(".btn") will still give you the button.

btns.addEventListener("click", function (event) {
  const clickedButton = event.target.closest(".btn");
  // const clickedButton = event.target;
  // if (event.target.matches("button")) {
    if(clickedButton){
    const type = clickedButton.dataset.type;
    const value = clickedButton.dataset.value;
    btnIndex.textContent = `Btn Type: ${type}`;
    btnValue.textContent = `Btn value: ${value}`;
    // console.log(type);
  }
});
