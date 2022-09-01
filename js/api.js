import config from './config.js'

class Api {
  constructor(url) {
    this.url = url
  }

  async getData() {
    try {
      return await fetch(this.url)
        .then(response => response.json())
        .then(response => response.results)
    }
    catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
  }
}

const api = new Api(config.url)

export default api




