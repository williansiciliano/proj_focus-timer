import state from "./state.js"
import * as audios from "./audios.js"
import * as elements from "./elements.js"

export function countdown(){
	
	clearTimeout(state.countdownId) //zerar o  timeout sempre no início

	if(!state.isRunning){ //quando não estiver rodando
		return
	}

	//quando ESTIVER rodando
	let minutes = Number(elements.minutes.textContent)
	let seconds = Number(elements.seconds.textContent)

	seconds-- //diminuir 1s a cada rodada

	//como funciona o relógio
	if(seconds < 0 ){ // Os segundos chegando a ZERO, retorna a 59 e diminui 1min
		seconds = 59
		minutes--

		if(minutes < 0){ // quando chegar a 1 minuto, interrompe a contagem. Senão, atualiza o Alarme e a cada 1s countdown() é chamada novamente.
			audios.kitchenTimer.play()
			reset()
			return
		}
	}

	//Atualizar o Alarme passando os argumentos de minutes e seconds
	updateAlarm(minutes, seconds)

	//chamar, por recursividade, a função countdown() a cada 1s
	state.countdownId = setTimeout(() => {
		countdown()
	}, 1000);
}

export function updateAlarm(minutes, seconds){
	minutes = minutes ?? state.minutes	
	seconds = seconds ?? state.seconds	

	elements.minutes.textContent = String(minutes).padStart(2, "0")
	elements.seconds.textContent = String(seconds).padStart(2, "0")

}
