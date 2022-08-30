export default function changeCustomRange(input01, input02, track, values, reset) {
  const RANGE_THUMB_OFFSET = 2
  const inputs = new Map()
  inputs.set(input01, input02)
  inputs.set(input02, input01)

  changeRangeValuesInHTML(input01, input02, values)
  fillRangeTrack(input01, input02, track)

  reset.addEventListener('click', function() {
    setTimeout(() => {
      changeRangeValuesInHTML(input01, input02, values)
      fillRangeTrack(input01, input02, track)}, 10)
  })

  input01.addEventListener('input', function() {
    changeCustomRange(this)
  })

  input02.addEventListener('input', function() {
    changeCustomRange(this)
  })

  function changeCustomRange(that) {
    if (+input01.value <= +input02.value) {
      input01.style.zIndex = '1'
      input02.style.zIndex = '1'
      that.style.zIndex = '2'
      changeRangeValuesInHTML(input01, input02, values)
      fillRangeTrack(input01, input02, track)
    }
    else that.value = inputs.get(that).value
  }

  function changeRangeValuesInHTML(input01, input02, values) {
    values.innerText = `${input01.value} - ${input02.value}`
  }

  function fillRangeTrack(input01, input02, track){
    let percent01 = input01.value / input01.max * 100 - RANGE_THUMB_OFFSET
    let percent02 = input02.value / input02.max * 100 + RANGE_THUMB_OFFSET

    track.style.background = `linear-gradient(to right, rgba(14, 50, 71, 50%) ${percent01}% , rgba(122, 195, 226, 100%) ${percent01}% , rgba(237, 126, 175, 100%) ${percent02}%, rgba(14, 50, 71, 100%) ${percent02}%)`
  }
}
