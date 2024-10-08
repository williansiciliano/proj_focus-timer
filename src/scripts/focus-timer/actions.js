import state from './state.js'
import * as elements from './elements.js'
import * as audios from './audios.js'
import * as timer from './timer.js'

export function toggleRunning(){
	state.isRunning = document.documentElement.classList.toggle('running');
  timer.countdown()
	audios.btnPressed.play()
}

export function reset(){
  state.isRunning = false;
	document.documentElement.classList.remove('running');
  timer.updateAlarm();
	audios.btnPressed.play()
}

export function set(){
  elements.minutes.setAttribute('contenteditable', true)
  elements.minutes.focus()
	audios.btnPressed.play()
}

export function addFiveMinutes(){
  let minutes = Number(elements.minutes.textContent)
  minutes = minutes + 5
  minutes = minutes > 60 ? 60 : minutes

  timer.updateAlarm(minutes)

	audios.btnPressed.play()
}

export function removeFiveMinutes(){
  let minutes = Number(elements.minutes.textContent)
  minutes = minutes - 5

  minutes = minutes < 0 ? 0 : minutes

  timer.updateAlarm(minutes)

	audios.btnPressed.play()
}

// SOUNDS BUTTONS
// Mapping buttons and audios
const sounds = [
  { button: elements.btnLofi, audio: audios.lofiMusic },
  { button: elements.btnRainSound, audio: audios.rainSound },
  { button: elements.btnForestSound, audio: audios.forestSound },
  { button: elements.btnFireplaceSound, audio: audios.fireplaceSound }
];

// Function to remove 'playing' from all buttons and pause all audios
function resetSounds(excludeIndex) {
  sounds.forEach((sound, soundIndex) => {
    if (soundIndex !== excludeIndex) {
      sound.button.classList.remove('playing');
      sound.audio.pause();
    }
  });
}

// General toggle function
export function toggleSound(index) {
  const selectedSound = sounds[index];
  const isAlreadyPlaying = selectedSound.button.classList.contains('playing');

  // Reset all other sounds except the one being clicked
  resetSounds(index);

  // Toggle class and play/pause audio only if it was not already playing
  if (!isAlreadyPlaying) {
    selectedSound.button.classList.add('playing');
    selectedSound.audio.play();
  } else {
    selectedSound.button.classList.remove('playing');
    selectedSound.audio.pause();
  }
}

export function toggleLofiMusic() {
	toggleSound(0);
}
export function toggleRainSound(){toggleSound(1);}
export function toggleForestSound(){toggleSound(2);}
export function toggleFireplaceSound(){toggleSound(3);}

