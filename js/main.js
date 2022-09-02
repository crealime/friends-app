import CustomRange from './range.js'
import store from './store.js'
import Friends from './friends.js'

const glob = {}

function initMain() {
  glob.baseURL = new URL(window.location)
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
  glob.friendsContainer = document.querySelector('.friends')
  glob.main = document.querySelector('.main')
  glob.inputs = document.querySelectorAll('input')
  glob.search = document.querySelector('.top-menu__search')

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
    store.init().then(() => {
      glob.friends.reloadPersons(store.persons)
      glob.friends.filterFriends(glob.inputs, glob.search.value)
    })
  })

  glob.formFilters.addEventListener('change', function(e) {

    if (e.target.name === 'by-age') glob.inputs.forEach(input => {
      if (input.name === 'by-name') input.checked = false
    })
    if (e.target.name === 'by-name') glob.inputs.forEach(input => {
      if (input.name === 'by-age') input.checked = false
    })

    if (e.target.name) updateURL(e.target.name, e.target.value)

    glob.friends.filterFriendsByURL()
    // glob.friends.filterFriends(glob.inputs, glob.search.value)
  })

  glob.formFilters.addEventListener('reset', function() {
    resetURL()
    glob.search.value = ''
    glob.friends.filterFriendsByURL()
    // glob.friends.filterFriends([], glob.search.value)
  })

  glob.search.addEventListener('input', function(e) {
    updateURL(e.target.name, e.target.value)

    glob.friends.filterFriendsByURL()
    // glob.friends.filterFriends(glob.inputs, e.target.value)
  })
}

function setInputs() {
  const params = (new URL(document.location).searchParams)

  if (params.get('age-min')) {
    document.querySelector('input[name="age-min"]').value = params.get('age-min')
  }
  if (params.get('age-max')) {
    document.querySelector('input[name="age-max"]').value = params.get('age-max')
  }
  if (params.get('by-age') === 'up') {
    document.querySelector('input[name="by-age"][value="up"]').checked = true
  }
  if (params.get('by-age') === 'down') {
    document.querySelector('input[name="by-age"][value="down"]').checked = true
  }
  if (params.get('by-name') === 'up') {
    document.querySelector('input[name="by-name"][value="up"]').checked = true
  }
  if (params.get('by-name') === 'down') {
    document.querySelector('input[name="by-name"][value="down"]').checked = true
  }
  if (params.get('by-gender') === 'all') {
    document.querySelector('input[name="by-gender"][value="all"]').checked = true
  }
  if (params.get('by-gender') === 'male') {
    document.querySelector('input[name="by-gender"][value="male"]').checked = true
  }
  if (params.get('by-gender') === 'female') {
    document.querySelector('input[name="by-gender"][value="female"]').checked = true
  }
  if (params.get('is-name')) {
    document.querySelector('input[name="is-name"]').value = params.get('is-name')
  }
}

function updateURL(param, value) {
  if (param === 'by-age') glob.baseURL.searchParams.delete('by-name')
  if (param === 'by-name') glob.baseURL.searchParams.delete('by-age')

  glob.baseURL.searchParams.set(param, value)
  history.replaceState(null, null, glob.baseURL)
}

function resetURL() {
  glob.baseURL = new URL(window.location.origin + window.location.pathname)
  history.replaceState(null, null, window.location.origin + window.location.pathname)
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
  setInputs()
  initAgeRange()
  store.init().then(() => {
    console.log(store.persons)
    glob.friends = new Friends(store.persons, glob.friendsContainer)
    glob.friends.filterFriendsByURL()
  })

  fadeOut(glob.preloader, 300, 500)
})

setTimeout(() => fadeOut(glob.preloader, 300, 500), 3000)
