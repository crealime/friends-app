export default class CustomRange {
  constructor(input01, input02, track, values, form, colorPrimary, colorMan, colorWoman) {
    this.input01 = input01
    this.input02 = input02
    this.track = track
    this.values = values
    this.form = form
    this.colorPrimary = colorPrimary
    this.colorMan = colorMan
    this.colorWoman = colorWoman
    this.gradienrOffset = 2

    this.inputs = new Map()
    this.inputs.set(input01, input02)
    this.inputs.set(input02, input01)

    // First changes
    this.changeRangeValuesInHTML(this.input01, this.input02, this.values)
    this.fillRangeTrack(this.input01, this.input02, this.track)

    // Listeners
    this.form.addEventListener('reset', () => {
      setTimeout(() => {
        this.changeRangeValuesInHTML()
        this.fillRangeTrack()}, 10)
    })

    this.input01.addEventListener('input', (e) => {
      this.changeCustomRange(e.target)
    })

    this.input02.addEventListener('input', (e) => {
      this.changeCustomRange(e.target)
    })
  }

  // Methods
  changeCustomRange(that) {
    if (+this.input01.value <= +this.input02.value) {
      this.inputs.get(that).style.zIndex = '1'
      that.style.zIndex = '2'
      this.changeRangeValuesInHTML()
      this.fillRangeTrack()
    }
    else that.value = this.inputs.get(that).value
  }

  changeRangeValuesInHTML() {
    this.values.innerText = `${this.input01.value} - ${this.input02.value}`
  }

  fillRangeTrack(){
    let percent01 = this.input01.value / this.input01.max * 100 - this.gradienrOffset
    let percent02 = this.input02.value / this.input02.max * 100 + this.gradienrOffset

    this.track.style.background = `linear-gradient(to right, ${this.colorPrimary} ${percent01}% , ${this.colorMan} ${percent01}% , ${this.colorWoman} ${percent02}%, ${this.colorPrimary} ${percent02}%)`
  }
}
