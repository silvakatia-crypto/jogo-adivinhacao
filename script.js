// 1. Array de objetos contendo palavras e dicas
const bancoPalavras = [
    { palavra: "JAVASCRIPT", dica: "Linguagem de programação que roda no navegador" },
    { palavra: "ALGORITMO", dica: "Sequência finita de passos para resolver um problema" },
    { palavra: "NAVEGADOR", dica: "Software usado para acessar páginas na Web" },
    { palavra: "VARIAVEL", dica: "Espaço na memória para armazenar um valor" },
    { palavra: "GITHUB", dica: "Plataforma de hospedagem de código com controle de versão" },
    { palavra: "COMPILADOR", dica: "Programa que traduz código-fonte para linguagem de máquina" }
  ];
  
  // Variáveis de estado do jogo
  let palavraSecreta = "";
  let letrasDescobertas = [];
  let letrasErradas = [];
  let tentativasRestantes = 6;
  let jogoAtivo = true;
  
  // Seletores do DOM
  const elDica = document.getElementById("dica");
  const elPalavraOculta = document.getElementById("palavra-oculta");
  const elForm = document.getElementById("form-palpite");
  const elInputLetra = document.getElementById("input-letra");
  const elBtnTentar = document.getElementById("btn-tentar");
  const elTentativas = document.getElementById("tentativas");
  const elLetrasUsadas = document.getElementById("letras-usadas");
  const elMensagem = document.getElementById("mensagem");
  const elBtnReiniciar = document.getElementById("btn-reiniciar");
  
  // Função para iniciar ou reiniciar o jogo
  function iniciarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * bancoPalavras.length);
    const sorteada = bancoPalavras[indiceAleatorio];
  
    palavraSecreta = sorteada.palavra;
    letrasDescobertas = [];
    letrasErradas = [];
    tentativasRestantes = 6;
    jogoAtivo = true;
  
    // Estrutura de repetição para preencher o array com sublinhados
    for (let i = 0; i < palavraSecreta.length; i++) {
      letrasDescobertas.push("_");
    }
  
    // Atualiza interface
    elDica.textContent = `Dica: ${sorteada.dica}`;
    elMensagem.textContent = "";
    elMensagem.className = "mensagem";
    elInputLetra.disabled = false;
    elBtnTentar.disabled = false;
    elBtnReiniciar.classList.add("oculto");
    elInputLetra.value = "";
    elInputLetra.focus();
  
    atualizarTela();
  }
  
  // Função para renderizar o estado atual no DOM
  function atualizarTela() {
    elPalavraOculta.textContent = letrasDescobertas.join(" ");
    elTentativas.textContent = tentativasRestantes;
  
    const todasUsadas = [...letrasErradas, ...letrasDescobertas.filter(l => l !== "_")];
    elLetrasUsadas.textContent = todasUsadas.length > 0 ? todasUsadas.join(", ") : "Nenhuma";
  }
  
  // Função para processar a tentativa do usuário
  function verificarLetra(letra) {
    if (!jogoAtivo) return;
  
    // Validação: apenas letras de A a Z
    if (!/^[A-Z]$/.test(letra)) {
      elMensagem.textContent = "Digite apenas uma letra válida (A-Z).";
      return;
    }
  
    // Verifica se a letra já foi tentada
    if (letrasDescobertas.includes(letra) || letrasErradas.includes(letra)) {
      elMensagem.textContent = `Você já tentou a letra "${letra}".`;
      return;
    }
  
    elMensagem.textContent = "";
    let acertou = false;
  
    // Estrutura de repetição para comparar a letra com cada caractere da palavra
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        letrasDescobertas[i] = letra;
        acertou = true;
      }
    }
  
    if (!acertou) {
      letrasErradas.push(letra);
      tentativasRestantes--;
    }
  
    atualizarTela();
    verificarFimDeJogo();
  }
  
  // Função para checar vitória ou derrota
  function verificarFimDeJogo() {
    if (!letrasDescobertas.includes("_")) {
      jogoAtivo = false;
      elMensagem.textContent = "Parabéns! Você venceu!";
      elMensagem.classList.add("vitoria");
      encerrarPartida();
    } else if (tentativasRestantes <= 0) {
      jogoAtivo = false;
      elMensagem.textContent = `Fim de jogo! A palavra era: ${palavraSecreta}`;
      elMensagem.classList.add("derrota");
      encerrarPartida();
    }
  }
  
  function encerrarPartida() {
    elInputLetra.disabled = true;
    elBtnTentar.disabled = true;
    elBtnReiniciar.classList.remove("oculto");
  }
  
  // Eventos
  elForm.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Evita o recarregamento da página
    const letraDigitada = elInputLetra.value.trim().toUpperCase();
    elInputLetra.value = "";
    elInputLetra.focus();
    verificarLetra(letraDigitada);
  });
  
  elBtnReiniciar.addEventListener("click", iniciarJogo);
  
  // Inicializa o jogo ao carregar a página
  iniciarJogo();