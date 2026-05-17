let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

export function playTone(freq: number, duration: number, type: OscillatorType = 'square') {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {}
}

export function playComplete() {
  playTone(523, 0.1, 'sine')
  setTimeout(() => playTone(659, 0.1, 'sine'), 100)
  setTimeout(() => playTone(784, 0.2, 'sine'), 200)
}

export function playBossHit() {
  playTone(150, 0.3, 'sawtooth')
}

export function playBossKill() {
  playTone(400, 0.1, 'square')
  setTimeout(() => playTone(500, 0.1, 'square'), 80)
  setTimeout(() => playTone(600, 0.1, 'square'), 160)
  setTimeout(() => playTone(800, 0.3, 'square'), 240)
}

export function playError() {
  playTone(200, 0.15, 'square')
  setTimeout(() => playTone(150, 0.2, 'square'), 150)
}

export function playClick() {
  playTone(800, 0.05, 'sine')
}
