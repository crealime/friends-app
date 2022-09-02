import CustomRange from './range.js'
import store from './store.js'
import Friends from './friends.js'
import Pagination from './pagination.js'
import Filters from "./filters.js";

const glob = {}

function initGlob() {
  glob.baseURL = new URL(window.location)
  glob.cardsOnPage = 24
  glob.currentPage = glob.baseURL.searchParams.get('page') || 1
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
  glob.paginationInput = document.querySelector('.pagination__input')
  glob.paginationLeft = document.querySelector('.pagination__left')
  glob.paginationRight = document.querySelector('.pagination__right')

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
      glob.friends.filterFriendsByURL(glob.baseURL)
    })
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

function initPagination() {
  glob.pagination = new Pagination(glob)
}

function initFriends() {
  store.init().then(() => {
    glob.friends = new Friends(store.persons, glob)
    glob.friends.filterFriendsByURL(glob.baseURL)
  })
}

function initFilters() {
  glob.filters = new Filters(glob)
}

window.addEventListener('load', function() {
  initGlob()
  initFilters()
  initAgeRange()
  initFriends()
  initPagination()
  fadeOut(glob.preloader, 300, 500)
})

setTimeout(() => fadeOut(glob.preloader, 300, 500), 3000)
