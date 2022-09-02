const config = {
  base: new URL('https://randomuser.me/api/'),
  inc: 'dob,gender,name,phone,location,picture,login',
  nat: 'us,de,fr,gb,ua,us,ca',
  results: 100,
  getUrl() {
    const fullURL = this.base
    fullURL.searchParams.set('inc', this.inc)
    fullURL.searchParams.set('nat', this.nat)
    fullURL.searchParams.set('results', this.results)
    return fullURL
  }
}

export default config
