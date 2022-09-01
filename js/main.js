import CustomRange from './range.js'
import store from './store.js'

const glob = {}

function initMain() {
  glob.rangeAge01 = document.querySelector('.range__age_01')
  glob.rangeAge02 = document.querySelector('.range__age_02')
  glob.trackAge = document.querySelector('.range__age-track')
  glob.valuesAge = document.querySelector('.range__age-values')
  glob.formFilters = document.querySelector('.filter')
  glob.showFilters = document.querySelector('.top-menu__show-filters')
  glob.showFiltersIcon = document.querySelector('.top-menu__show-filters-icon')
  glob.reloadData = document.querySelector('.top-menu__reload-data')
  glob.reloadDataIcon = document.querySelector('.top-menu__reload-data-icon')
  glob.preloader = document.querySelector('.preloader')
  glob.main = document.querySelector('.main')
  glob.colorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
  glob.colorMan = getComputedStyle(document.documentElement).getPropertyValue('--color-man')
  glob.colorWoman = getComputedStyle(document.documentElement).getPropertyValue('--color-woman')

  glob.showFilters.addEventListener('click', function(e) {
    e.preventDefault()
    glob.main.classList.toggle('m-left-0')
    glob.showFiltersIcon.classList.toggle('rotate-180')
  })

  glob.reloadData.addEventListener('click', function(e) {
    e.preventDefault()
    glob.reloadDataIcon.classList.toggle('rotate-360')
  })
}

function initAgeRange() {
  new CustomRange(glob.rangeAge01, glob.rangeAge02, glob.trackAge, glob.valuesAge, glob.formFilters, glob.colorPrimary, glob.colorMan, glob.colorWoman)
}

function fadeOut(element, duration, delay) {
  const animation = element.animate([
    {opacity: 1},
    {opacity: 0}
  ], {
    delay,
    duration,
    easing: 'ease-out'
  })
  animation.addEventListener('finish', function() {
    element.style.display = 'none'
  })
}

window.addEventListener('load', function() {
  initMain()
  initAgeRange()
  // store.init().then(() => {
  //   console.log(store.persons)
  // })

  glob.formFilters.addEventListener('click', () => {
    console.log(store.getFemale())
  })

  fadeOut(glob.preloader, 300, 500)
})