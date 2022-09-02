export default class Friends {
  constructor(persons, container) {
    this.persons = persons
    this.personsEdit = [...this.persons]
    this.container = container
  }

  reloadPersons(persons) {
    this.persons = persons
    this.personsEdit = [...this.persons]
  }

  filterFriendsByURL() {
    this.personsEdit = [...this.persons]
    const params = (new URL(document.location).searchParams)
    if (params.get('age-min')) {
      this.personsEdit = this.personsEdit.filter(person => person.dob.age >= params.get('age-min'))
    }
    if (params.get('age-max')) {
      this.personsEdit = this.personsEdit.filter(person => person.dob.age <= params.get('age-max'))
    }
    if (params.get('by-age') === 'up') {
      this.personsEdit = this.personsEdit.sort((a, b) => a.dob.age - b.dob.age)
    }
    if (params.get('by-age') === 'down') {
      this.personsEdit = this.personsEdit.sort((a, b) => b.dob.age - a.dob.age)
    }
    if (params.get('by-name') === 'up') {
      this.personsEdit = this.personsEdit.sort((a, b) => a.name.first > b.name.first ? 1 : -1)
    }
    if (params.get('by-name') === 'down') {
      this.personsEdit = this.personsEdit.sort((a, b) => a.name.first < b.name.first ? 1 : -1)
    }
    if (params.get('by-gender') && params.get('by-gender') !== 'all') {
      this.personsEdit = this.personsEdit.filter(person => person.gender === params.get('by-gender'))
    }
    if (params.get('is-name')) {
      this.personsEdit = this.personsEdit.filter(person => `${person.name.first} ${person.name.last}`.toLowerCase().includes(params.get('is-name').toLowerCase()))
    }

    this.renderFriends(this.personsEdit)
  }

  renderFriends(persons = this.personsEdit) {
    this.container.innerHTML = ''

    this.container.innerHTML = persons.reduce((acc, el) => {
      return acc + this.getCardTemplate(el)
    }, '')
  }

  getCardTemplate(person) {
    return `
      <div data-id="${person.login.md5}" class="card color-${person.gender}">
        <div class="card__header">
          <div class="card__nick">${person.login.password}</div>
          <div class="card__age">${person.dob.age}</div>
        </div>
        <div class="card__main">
          <img src="${person.picture.large}" alt="${person.login.password}" class="card__img">
          <div class="card__name">${person.name.first} ${person.name.last}</div>
          <div class="card__contacts">
            <div class="card__tel">${person.phone}</div>
            <div class="card__country">${person.location.country}, ${person.location.city}</div>
            <div class="card__address">${person.location.street.name}, ${person.location.street.number}</div>
          </div>
        </div>
        <div class="card__footer">
          <div class="card__gender">
            ${person.gender === 'male' 
              ? '<i class="fa-solid fa-mars"></i>'
              : '<i class="fa-solid fa-venus"></i>'}
          </div>
        </div>
      </div>
    `
  }
}
