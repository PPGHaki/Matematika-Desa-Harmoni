/**
 * Sound synthesis using Web Audio API
 * No external audio files needed - runs offline and reliably!
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  public sfxEnabled: boolean = true;
  public musicEnabled: boolean = false;
  private musicInterval: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // Ignore audio context restriction
    }
  }

  playItemPick() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, this.ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore
    }
  }

  playSubtract() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(293.66, this.ctx.currentTime + 0.16); // D4
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {
      // Ignore
    }
  }

  playError() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {
      // Ignore
    }
  }

  playSuccess() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      // Bright pentatonic major arpeggio (C5, E5, G5, C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + index * 0.08;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  playFinish() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      // Grand celebratory fanfare
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + index * 0.1;
        gain.gain.setValueAtTime(0.28, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Ignore
    }
  }

  toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
    return this.musicEnabled;
  }

  private startAmbientMusic() {
    this.stopAmbientMusic();
    this.initCtx();
    // Gentle gamelan/marimba pentatonic scale (Slendro/Pelog inspired C, D, E, G, A)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let step = 0;
    
    this.musicInterval = window.setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;
      try {
        const note = scale[step % scale.length];
        step = (step + Math.floor(Math.random() * 3) + 1) % scale.length;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.6);
      } catch {
        // Ignore
      }
    }, 450);
  }

  private stopAmbientMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundEngine();

export function speakIndonesian(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
