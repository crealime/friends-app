import Range from './range'

const main = {}

function initMain() {
  console.log(main)
}

function initRange() {
  const input01 = document.querySelector('.range__input_01')
  const input02 = document.querySelector('.range__input_02')
  const values = document.querySelector('.range__values')

  const rangeByAge = new Range(input01, input02, values)

  console.log(rangeByAge)
}

document.addEventListener('DOMContentLoaded', function() {
  initMain()
  initRange()
})