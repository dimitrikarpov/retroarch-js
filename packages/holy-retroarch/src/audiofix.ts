/**
 * Possible fix of crushing page when something goes wrong in [queueAudion](https://github.com/libretro/RetroArch/blob/master/emscripten/library_rwebaudio.js#L57) function and it can get a new timestamp
 * This issue freeze the page because of infinite loop of Module process.
 * I am not pretty shure why it is happening. But it never happens if where was a some background music any other noise.
 * This fix generates 1 second of not hearing sound at superlow volume before emulator start.
 * I hope this can help
 *
 * @param duration milliseconds
 */
export function makeSilence(duration: number = 1000) {
  const audioCtx = new window.AudioContext()

  const oscillator = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  gainNode.gain.value = 0.01
  oscillator.frequency.value = 20000
  oscillator.type = "square"

  oscillator.start()

  setTimeout(function () {
    oscillator.stop()
  }, duration)
}
