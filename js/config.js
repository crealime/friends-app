const config = {
  base: new URL('https://randomuser.me/api/'),
  inc: 'dob,gender,name,phone,location,picture,login',
  nat: 'us,de,fr,gb,ua,us,ca',
  results: 240,
  getUrl() {
    this.base.searchParams.set('inc', this.inc)
    this.base.searchParams.set('nat', this.nat)
    this.base.searchParams.set('results', this.results)
    return this.base
  }
}

export default config
