// Lightweight Web Audio API synthesizer for cinematic intro sound effects
class IntroAudioEngine {
  private ctx: AudioContext | null = null
  private ambientOsc: OscillatorNode | null = null
  private ambientGain: GainNode | null = null

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public playAmbientSubHum() {
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(55, now) // Low A1 sub-bass
      osc.frequency.exponentialRampToValueAtTime(110, now + 3) // Rise to A2

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.12, now + 0.8)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      this.ambientOsc = osc
      this.ambientGain = gain
    } catch {
      // Audio autoplay policies backstop
    }
  }

  public playTargetLockBeep() {
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(880, now) // A5
      osc.frequency.setValueAtTime(1760, now + 0.08) // A6 lock blip

      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.25)
    } catch {
      // Audio autoplay policies backstop
    }
  }

  public playNetflixTudum() {
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      // First impact ("TU")
      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(65, now)
      osc1.frequency.exponentialRampToValueAtTime(30, now + 0.2)
      gain1.gain.setValueAtTime(0.25, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
      osc1.connect(gain1)
      gain1.connect(this.ctx.destination)
      osc1.start(now)
      osc1.stop(now + 0.25)

      // Second deep impact ("DUM") - 0.12s later
      const delay = 0.12
      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(80, now + delay)
      osc2.frequency.exponentialRampToValueAtTime(25, now + delay + 1.2)
      gain2.gain.setValueAtTime(0.4, now + delay)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.4)

      // Sub-harmonic oscillator
      const subOsc = this.ctx.createOscillator()
      const subGain = this.ctx.createGain()
      subOsc.type = 'triangle'
      subOsc.frequency.setValueAtTime(40, now + delay)
      subOsc.frequency.exponentialRampToValueAtTime(18, now + delay + 1.0)
      subGain.gain.setValueAtTime(0.3, now + delay)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.2)

      osc2.connect(gain2)
      subOsc.connect(subGain)
      gain2.connect(this.ctx.destination)
      subGain.connect(this.ctx.destination)

      osc2.start(now + delay)
      subOsc.start(now + delay)
      osc2.stop(now + delay + 1.4)
      subOsc.stop(now + delay + 1.4)

      // Fade out ambient sub hum if active
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
      }
    } catch {
      // Audio backstop
    }
  }

  public playHyperWarpZoom() {
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      // 1. Frequency sweep riser
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(100, now)
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.9)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.linearRampToValueAtTime(0.25, now + 0.6)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1)

      // Low pass filter sweep
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(200, now)
      filter.frequency.exponentialRampToValueAtTime(8000, now + 0.8)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 1.1)

      // Fade out ambient sub hum if active
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
      }
    } catch {
      // Audio backstop
    }
  }

  public stopAll() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop()
      } catch {
        // Ignored
      }
      this.ambientOsc = null
    }
  }
}

export const introAudio = new IntroAudioEngine()
