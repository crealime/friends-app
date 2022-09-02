export default class Pagination {
  constructor(glob) {
    this.glob = glob

    this.setCurrentPageToInput(this.glob.currentPage)
    this.glob.paginationLeft.addEventListener('click', () => {this.listToPreviousPage()})
    this.glob.paginationRight.addEventListener('click', () => {this.listToNextPage()})
    this.glob.paginationInput.addEventListener('change', (e) => {this.listToThisPage(e)})
  }

  changePage(page) {
    this.glob.currentPage = page
    this.glob.friends.renderFriends(this.glob.friends.personsEdit, page)
    this.setCurrentPageToInput(page)
    this.glob.baseURL.searchParams.set('page', page)
    history.replaceState(null, null, this.glob.baseURL)
  }

  listToPreviousPage() {
    if (this.glob.currentPage > 1) {
      this.glob.currentPage --
      this.changePage(this.glob.currentPage)
    }
  }

  listToNextPage() {
    if (this.glob.currentPage < this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.glob.currentPage ++
      this.changePage(this.glob.currentPage)
    }
  }

  listToThisPage(e) {
    const page = e.target.value
    if (page > 0 && page <= this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.changePage(page)
    }
    else if (page > this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.changePage(Math.ceil(this.glob.friends.personsEdit.length / this.glob.cardsOnPage))
    }
    else {
      this.changePage(1)
    }
  }

  setCurrentPageToInput(page) {
    this.glob.paginationInput.value = page
  }

}