let darkMode = true;
let divToggleMode = document.querySelector('#toggle-mode')
let statusDarkMode = document.querySelector('#status-dark-mode')
let statusDarkModeAfterClick
divToggleMode.addEventListener('click', () => {
	document.documentElement.classList.toggle('light')
	statusDarkModeAfterClick = darkMode ? 'Light' : 'Dark'
	statusDarkMode.textContent = (`${statusDarkModeAfterClick} mode ativado!`)
	darkMode = !darkMode

})