export default class Range {
  constructor(input01, input02, values) {
    this.input01 = input01
    this.input02 = input02
    this.values = values
  }
}


window.onload = function(){
  fillRangeOne();
  fillRangeTwo();
}

let rangeOne = document.querySelector(".range__input_01");
let rangeTwo = document.querySelector(".range__input_02");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let displayValDash = document.getElementById("dash");
let minGap = 0;
let rangeTrack = document.querySelector(".range__track");
let rangeMaxValue = document.querySelector(".range__input_01").max;

function fillRangeOne(){
  if(parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap){
    rangeOne.value = parseInt(rangeTwo.value) - minGap;
  }
  if(parseInt(rangeTwo.value) - parseInt(rangeOne.value) !== 0){
    displayValOne.textContent = rangeOne.value;
    displayValDash.textContent = ' - ';
  } else {
    displayValOne.textContent = '';
    displayValDash.textContent = '';
  }
  fillColor();
}
function fillRangeTwo(){
  if(parseInt(rangeTwo.value) - parseInt(rangeOne.value) <= minGap){
    rangeTwo.value = parseInt(rangeOne.value) + minGap;
  }
  if(parseInt(rangeTwo.value) - parseInt(rangeOne.value) !== 0){
    displayValOne.textContent = rangeOne.value;
    displayValDash.textContent = ' - ';
  } else {
    displayValOne.textContent = '';
    displayValDash.textContent = '';
  }
  displayValTwo.textContent = rangeTwo.value;
  fillColor();
}
function fillColor(){
  if(rangeOne.value === '100'){
    rangeOne.style.zIndex = '10'
  }

  let percent1 = rangeOne.value / rangeMaxValue * 100;
  let percent2 = rangeTwo.value / rangeMaxValue * 100;
  rangeTrack.style.background = `linear-gradient(to right, rgba(14, 50, 71, 50%) ${percent1}% , rgba(122, 195, 226, 100%) ${percent1}% , rgba(237, 126, 175, 100%) ${percent2}%, rgba(14, 50, 71, 100%) ${percent2}%)`;
}