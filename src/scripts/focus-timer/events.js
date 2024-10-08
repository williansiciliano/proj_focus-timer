import * as elements from './elements.js'
import * as actions from './actions.js'
import state from './state.js'
import { updateAlarm } from './timer.js'

export function handleControlClicks(){
	elements.controls.addEventListener('click', (event) =>{
		const action = event.target.dataset.action
		if(typeof actions[action] != 'function'){
			return
		}
		actions[action]()
	})
}

export function setMinutes(){
	elements.minutes.addEventListener('focus', () => {
		elements.minutes.textContent = '' //zerar o conteúdo
	})

	elements.minutes.addEventListener('keypress', (event) => {
		/\d/.test(event.key) // testar a regEX para dígitos de 0 - 9 ("\d"): se digitar um n° => TRUE; senão => FALSE
		if(!/\d/.test(event.key)){ //se o retorno for false, se não respeitar a regEX
			event.preventDefault() //impedimos o input da teclad digitada
		}
	})

	elements.minutes.addEventListener('blur', (event) => {
		let time = event.currentTarget.textContent

		time = time > 60 ? 60 : time //se time > 60, ficará como 60; senão, fica o conteudo digitado

		state.minutes = time;
		state.seconds = 0;

		updateAlarm();
		elements.minutes.removeAttribute('contenteditable');
	})
}

export function handleSoundsClicks(){
	elements.containerBtnSounds.addEventListener('click', (event) => {
		const action = event.target.dataset.action
		if(typeof actions[action] != 'function'){
			return
		}
		actions[action]()
	})
}

