export default class Filters {
  constructor(glob) {
    this.glob = glob
  }

  setInputs() {
    const params = this.glob.baseURL.searchParams

    document.querySelectorAll(`input[type="radio"]`).forEach(el => el.checked = false)

    if (!params.has('page')) {
      this.glob.currentPage = 1
      this.glob.pagination.setCurrentPageToInput()
    }
    if (!params.has('age-min')) {
      document.querySelector(`input[name="age-min"]`).value = 0
    }
    if (!params.has('age-max')) {
      document.querySelector(`input[name="age-max"]`).value = 100
    }

    for (let p of params) {
      if (p[0] === 'page') {
        this.glob.currentPage = p[1]
      }
      if (p[0] === 'age-min' || p[0] === 'age-max' || p[0] === 'is-name') {
        document.querySelector(`input[name="${p[0]}"]`).value = p[1]
      }
      else if (p[1] === 'up') {
        document.querySelector(`input[value="up"]`).checked = true
      }
      else if (p[1] === 'down') {
        document.querySelector(`input[value="down"]`).checked = true
      }
      else if (p[1] === 'all') {
        document.querySelector(`input[value="all"]`).checked = true
      }
      else if (p[1] === 'male') {
        document.querySelector(`input[value="male"]`).checked = true
      }
      else if (p[1] === 'female') {
        document.querySelector(`input[value="female"]`).checked = true
      }
    }

    this.glob.range.changeRangeValuesInHTML()
    this.glob.range.fillRangeTrack()
  }

  setHistory() {
    history.pushState({href: window.location.href}, null, this.glob.baseURL.href)
    history.replaceState({href: window.location.href}, null, this.glob.baseURL.href)
  }

  updateURL(param, value) {
    if (param === 'by-age') this.glob.baseURL.searchParams.delete('by-name')
    if (param === 'by-name') this.glob.baseURL.searchParams.delete('by-age')
    this.glob.baseURL.searchParams.set(param, value)
    if (param === 'is-name' && value.length === 0) this.glob.baseURL.searchParams.delete('is-name')
    this.setHistory()
  }

  resetURL() {
    this.glob.baseURL.searchParams.delete('by-name')
    this.glob.baseURL.searchParams.delete('by-age')
    this.glob.baseURL.searchParams.delete('by-gender')
    this.glob.baseURL.searchParams.delete('age-min')
    this.glob.baseURL.searchParams.delete('age-max')
    this.setHistory()
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
