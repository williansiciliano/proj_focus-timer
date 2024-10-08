import * as FocusTimer from './focus-timer/index.js'
import state from './focus-timer/state.js'
import './toggle-mode.js'

// FocusTimer.start(0,6);
FocusTimer.start(state.minutes, state.seconds)