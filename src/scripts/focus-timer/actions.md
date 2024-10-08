# Lógica
-Centralizar a lógica de remoção de classes e pausa de áudios. Criar uma função para desmarcar todos os botões e pausar todos os áudios de uma vez, antes de aplicar a ação específica do botão clicado.

-Uso de Arrays ou Objetos para mapeamento: Colocar os botões e áudios em arrays ou objetos mapeados.

-Como utilizar:
Para cada botão, basta chamar toggleSound passando o índice do som:
*toggleSound(0);*

**Resumo:**
*1. Mapeamento dos Botões e Áudios:*
Você cria uma lista (sounds) que mapeia cada botão aos seus respectivos áudios:


const sounds = [
  { button: elements.btnLofi, audio: audios.lofiMusic },
  { button: elements.btnRainSound, audio: audios.rainSound },
  { button: elements.btnForestSound, audio: audios.forestSound },
  { button: elements.btnFireplaceSound, audio: audios.fireplaceSound }
];


Cada entrada no array contém um objeto com duas propriedades:

-button: o elemento do botão que será clicado.
-audio: o arquivo de áudio correspondente ao botão.

*2. Função resetSounds(excludeIndex)*
Essa função é responsável por parar todos os sons e remover a classe playing de todos os botões, exceto o botão que foi clicado.


function resetSounds(excludeIndex) {
  sounds.forEach((sound, soundIndex) => {
    if (soundIndex !== excludeIndex) {
      sound.button.classList.remove('playing');
      sound.audio.pause();
    }
  });
}


Ela percorre o array sounds, e para cada som que não for o botão clicado (determinado pelo excludeIndex), a função:
-Remove a classe playing do botão (removendo o estilo visual).
-Pausa o áudio que está tocando.

*3. Função toggleSound(index):*
Essa função é chamada ao clicar em um botão de som. Ela alterna entre tocar ou pausar o áudio associado ao botão clicado, e também aplica ou remove a classe playing.


export function toggleSound(index) {
  const selectedSound = sounds[index];
  const isAlreadyPlaying = selectedSound.button.classList.contains('playing');

  // Reseta os outros sons antes de agir sobre o botão clicado
  resetSounds(index);

  // Se o botão não estava tocando, toca o som e aplica a classe 'playing'
  if (!isAlreadyPlaying) {
    selectedSound.button.classList.add('playing');
    selectedSound.audio.play();
  } else {
    // Caso contrário, pausa o som e remove a classe 'playing'
    selectedSound.button.classList.remove('playing');
    selectedSound.audio.pause();
  }
}


-index: o índice do botão clicado no array sounds.
-isAlreadyPlaying: verifica se o botão já está tocando (classList.contains('playing')).
-resetSounds(index): garante que todos os outros sons sejam parados e os outros botões percam a classe playing, exceto o botão atual.

-Lógica de alternância:
	--Se o botão não estava tocando (não tem a classe playing), ele começa a tocar e recebe a classe.
	--Se o botão já estava tocando, ele pausa o som e remove a classe.

*4. Funções Específicas para Cada Som:*
Cada função (como toggleLofiMusic) apenas chama toggleSound com o índice correto para o som correspondente.


export function toggleLofiMusic() {
  toggleSound(0);  // Primeiro som (Lofi Music)
}

export function toggleRainSound() {
  toggleSound(1);  // Segundo som (Rain Sound)
}


Essas funções são apenas atalhos que indicam qual som deve ser manipulado com base no índice no array sounds.

*Resumo Final:*
a. Resetar todos os sons e estilos: A função resetSounds(excludeIndex) garante que apenas um som esteja tocando por vez e aplica a lógica de alternância dos botões.

b. Alternar o estado de cada som: A função toggleSound(index) aplica a lógica de tocar/pausar e adicionar/remover a classe playing.

c. Um som por vez: Quando um botão é clicado, todos os outros sons são pausados e a classe playing é removida dos outros botões.
