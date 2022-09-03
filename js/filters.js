export default class Filters {
  constructor(glob) {
    this.glob = glob

    this.glob.formFilters.addEventListener('change', (e) => {

      if (e.target.name === 'by-age') this.glob.inputs.forEach(input => {
        if (input.name === 'by-name') input.checked = false
      })
      if (e.target.name === 'by-name') this.glob.inputs.forEach(input => {
        if (input.name === 'by-age') input.checked = false
      })

      if (e.target.name) this.updateURL(e.target.name, e.target.value)

      this.filterFriendsByURL(this.glob.baseURL)
    })

    this.glob.formFilters.addEventListener('reset', () => {
      this.resetURL()
      this.filterFriendsByURL(this.glob.baseURL)
    })

    this.glob.search.addEventListener('input', (e) => {
      this.updateURL(e.target.name, e.target.value)
      this.filterFriendsByURL(this.glob.baseURL)
    })

    this.setInputs()
  }

  setInputs() {
    const params = this.glob.baseURL.searchParams

    document.querySelectorAll(`input[type="radio"]`).forEach(el => el.checked = false)
    this.glob.customRange.changeRangeValuesInHTML()
    this.glob.customRange.fillRangeTrack()

    if (!params.has('page')) {
      this.glob.currentPage = 1
      this.glob.pagination.setCurrentPageToInput()
    }

    for (let p of params) {
      if (p[0] === 'page') {
        this.glob.currentPage = p[1]
      }
      if (p[0] === 'age-min' || p[0] === 'age-max' || p[0] === 'is-name') {
        document.querySelector(`input[name="${p[0]}"]`).value = p[1]
      }
      else if (p[1] === 'up') {
        document.querySelector(`input[name="${p[0]}"][value="up"]`).checked = true
      }
      else if (p[1] === 'down') {
        document.querySelector(`input[name="${p[0]}"][value="down"]`).checked = true
      }
      else if (p[1] === 'all') {
        document.querySelector(`input[name="${p[0]}"][value="all"]`).checked = true
      }
      else if (p[1] === 'male') {
        document.querySelector(`input[name="${p[0]}"][value="male"]`).checked = true
      }
      else if (p[1] === 'female') {
        document.querySelector(`input[name="${p[0]}"][value="female"]`).checked = true
      }
    }

    this.glob.customRange.changeRangeValuesInHTML()
    this.glob.customRange.fillRangeTrack()
  }

  updateURL(param, value) {
    if (param === 'by-age') this.glob.baseURL.searchParams.delete('by-name')
    if (param === 'by-name') this.glob.baseURL.searchParams.delete('by-age')
    this.glob.baseURL.searchParams.set(param, value)
    if (param === 'is-name' && value.length === 0) this.glob.baseURL.searchParams.delete('is-name')
    history.pushState({href: window.location.href}, null, this.glob.baseURL.href)
    history.replaceState({href: window.location.href}, null, this.glob.baseURL.href)
  }

  resetURL() {
    this.glob.baseURL.searchParams.delete('by-name')
    this.glob.baseURL.searchParams.delete('by-age')
    this.glob.baseURL.searchParams.delete('by-gender')
    this.glob.baseURL.searchParams.delete('age-min')
    this.glob.baseURL.searchParams.delete('age-max')
    history.pushState({href: window.location.href}, null, this.glob.baseURL.href)
    history.replaceState({href: window.location.href}, null, this.glob.baseURL.href)
  }

  filterFriendsByURL(url) {
    this.glob.friends.personsEdit = [...this.glob.friends.persons]
    const params = url.searchParams

    for (let p of params) {
      if (p[0] === 'age-min') {
        this.glob.friends.personsEdit = this.glob.friends.personsEdit.filter(person => person.dob.age >= p[1])
      }
      if (p[0] === 'age-max') {
        this.glob.friends.personsEdit = this.glob.friends.personsEdit.filter(person => person.dob.age <= p[1])
      }
      if (p[0] === 'by-age') {
        if (p[1] === 'up') this.glob.friends.personsEdit = this.glob.friends.personsEdit.sort((a, b) => a.dob.age - b.dob.age)
        if (p[1] === 'down') this.glob.friends.personsEdit = this.glob.friends.personsEdit.sort((a, b) => b.dob.age - a.dob.age)
      }
      if (p[0] === 'by-name') {
        if (p[1] === 'up') this.glob.friends.personsEdit = this.glob.friends.personsEdit.sort((a, b) => a.name.first > b.name.first ? 1 : -1)
        if (p[1] === 'down') this.glob.friends.personsEdit = this.glob.friends.personsEdit.sort((a, b) => a.name.first < b.name.first ? 1 : -1)
      }
      if (p[0] === 'by-gender' && p[1] !== 'all') {
        this.glob.friends.personsEdit = this.glob.friends.personsEdit.filter(person => person.gender === p[1])
      }
      if (p[0] === 'is-name') {
        this.glob.friends.personsEdit = this.glob.friends.personsEdit.filter(person => `${person.name.first} ${person.name.last}`.toLowerCase().includes(p[1].toLowerCase()))
      }
    }

    if (this.glob.currentPage > this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.glob.pagination.changePage(Math.ceil(this.glob.friends.personsEdit.length / this.glob.cardsOnPage) || 1)
    }

    this.glob.friends.renderFriends(this.glob.friends.personsEdit)
  }
}