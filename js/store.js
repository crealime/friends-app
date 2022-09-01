import api from './api.js'

class Store {
  constructor(api) {
    this.api = api
    this.persons = null
  }

  async init() {
    this.persons = await this.api.getData()
  }

  getFemale() {
    return this.persons.filter(el => el.gender === 'female')
  }
}

const store = new Store(api)

export default store