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

      this.glob.friends.filterFriendsByURL(this.glob.baseURL)
    })

    this.glob.formFilters.addEventListener('reset', () => {
      this.resetURL()
      this.glob.friends.filterFriendsByURL(this.glob.baseURL)
    })

    this.glob.search.addEventListener('input', (e) => {
      this.updateURL(e.target.name, e.target.value)
      this.glob.friends.filterFriendsByURL(this.glob.baseURL)
    })

    this.setInputs()
  }

  setInputs() {
    const params = this.glob.baseURL.searchParams

    for (let p of params) {
      if (p[0] === 'page') {
        this.glob.currentPage = p[1]
      }
      if (p[0] === 'age-min' || p[0] === 'age-man' || p[0] === 'is-name') {
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
  }

  updateURL(param, value) {
    if (param === 'by-age') this.glob.baseURL.searchParams.delete('by-name')
    if (param === 'by-name') this.glob.baseURL.searchParams.delete('by-age')
    this.glob.baseURL.searchParams.set(param, value)
    if (param === 'is-name' && value.length === 0) this.glob.baseURL.searchParams.delete('is-name')
    history.replaceState(null, null, this.glob.baseURL)
  }

  resetURL() {
    this.glob.baseURL.searchParams.delete('by-name')
    this.glob.baseURL.searchParams.delete('by-age')
    this.glob.baseURL.searchParams.delete('by-gender')
    this.glob.baseURL.searchParams.delete('age-min')
    this.glob.baseURL.searchParams.delete('age-max')
    history.replaceState(null, null, this.glob.baseURL)
  }
}