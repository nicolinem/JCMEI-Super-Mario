class AudioManager {
  constructor() {
    this.sounds = {};
  }

  loadSound(key, filepath) {
    const sound = new Audio(filepath);
    sound.load();
    this.sounds[key] = sound;
  }

  playSound(key) {
    if (this.sounds[key]) {
      this.sounds[key].currentTime = 0; // Rewind to the start
      this.sounds[key].play();
    } else {
      console.error("Sound not found:", key);
    }
  }

  stopSound(key) {
    if (this.sounds[key] && !this.sounds[key].paused) {
      this.sounds[key].pause();
      this.sounds[key].currentTime = 0;
    }
  }

  setVolume(key, volume) {
    if (this.sounds[key]) {
      this.sounds[key].volume = volume;
    }
  }

  loadAllSounds(soundFiles) {
    soundFiles.forEach(({ key, path }) => this.loadSound(key, path));
  }
}
