import changeCustomRange from './range.js'

const main = {}

function initMain() {
  main.rangeAge01 = document.querySelector('.range__age_01')
  main.rangeAge02 = document.querySelector('.range__age_02')
  main.trackAge = document.querySelector('.range__age-track')
  main.valuesAge = document.querySelector('.range__age-values')
  main.resetFilters = document.querySelector('.filter__button_reset')
}

function initAgeRange() {
  changeCustomRange(main.rangeAge01, main.rangeAge02, main.trackAge, main.valuesAge, main.resetFilters)
}

document.addEventListener('DOMContentLoaded', function() {
  initMain()
  initAgeRange()
})