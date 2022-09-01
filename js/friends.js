export default class Friends {
  constructor(persons, container) {
    this.persons = persons
    this.personsEdit = this.persons
    this.container = container
  }

  filterFriends(inputs = []) {
    this.personsEdit = this.persons

    inputs.forEach(input => {
      if (input.name === 'age-min') {
        this.personsEdit = this.personsEdit.filter(person => person.dob.age >= input.value)
      }
      if (input.name === 'age-max') {
        this.personsEdit = this.personsEdit.filter(person => person.dob.age <= input.value)
      }
      if (input.name === 'by-age' && input.checked && input.value === 'up') {
        this.personsEdit = this.personsEdit.sort((a, b) => a.dob.age - b.dob.age)
      }
      if (input.name === 'by-age' && input.checked && input.value === 'down') {
        this.personsEdit = this.personsEdit.sort((a, b) => b.dob.age - a.dob.age)
      }
      if (input.name === 'by-name' && input.checked && input.value === 'up') {
        this.personsEdit = this.personsEdit.sort((a, b) => a.name.first > b.name.first ? 1 : -1)
      }
      if (input.name === 'by-name' && input.checked && input.value === 'down') {
        this.personsEdit = this.personsEdit.sort((a, b) => a.name.first < b.name.first ? 1 : -1)
      }
      if (input.name === 'by-gender' && input.checked && input.value !== 'all') {
        this.personsEdit = this.personsEdit.filter(person => person.gender === input.value)
      }
    })

    this.renderFriends(this.personsEdit)
  }

  renderFriends(persons = this.personsEdit) {
    this.container.innerHTML = ''

    let fragment = ''

    persons.forEach(el => {
      const friend = this.cardTemplate(el)
      fragment += friend
    })

    this.container.innerHTML = fragment
  }

  cardTemplate(person) {
    return `
      <div class="card color-${person.gender}">
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
          <button class="card__button card__delete">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="card__gender">
            ${person.gender === 'male' 
              ? '<i class="fa-solid fa-mars"></i>'
              : '<i class="fa-solid fa-venus"></i>'}
          </div>
          <button class="card__button card__delete">
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    `
  }
}