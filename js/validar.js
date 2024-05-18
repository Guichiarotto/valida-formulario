/*
Guilherme Chiarotto de Moraes - NUSP: 12745229
*/

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var meter = document.querySelector("#passStrengthMeter");
const buttonSend = document.querySelector("#button_send");
var sendHelp = document.querySelector("#ButtonSendHelp");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener("focusout", validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e) {
  //declaração da expressão regular para definir o formato de um nome válido
  const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

  console.log(e); //impressão em console do objeto evento e
  console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento

  if (e.target.value.trim().match(regexNome) == null) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
    nomeHelp.textContent = "Formato de nome inválido";
    nomeHelp.style.color = "red";
  } else if (e.target.value.trim().replace(" ", "").length <= 6) {
    //testar tamanho removendo espaços
    nomeHelp.textContent = "O nome deve conter mais que 6 caracteres";
    nomeHelp.style.color = "red";
  } else {
    nomeHelp.textContent = "";
  }
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener("focusout", () => {
  //declaração da expressão regular para definir o formato de um ano válido
  const regexAno = /^[0-9]{4}$/;
  //tirar (trim) espaços em branco antes e depois da string
  const anoTrimado = ano.value.trim();
  console.log(ano.value);

  if (anoTrimado.match(regexAno) == null) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
    anoHelp.textContent = "Ano inválido";
    anoHelp.style.color = "red";
  } else if (parseInt(anoTrimado) < 1900 || parseInt(anoTrimado) > 2022) {
    anoHelp.textContent = "O ano deve estar entre 1900 e 2022";
    anoHelp.style.color = "red";
  } else {
    anoHelp.textContent = "";
  }
});

email.addEventListener("focusout", () => {
  //declaração da expressão regular para definir o formato de um email válido
  const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
  const emailTrimado = email.value.trim();
  console.log(email.value);

  if (emailTrimado.match(regexEmail) == null) {
    emailHelp.textContent = "Formato de email inválido";
    emailHelp.style.color = "red";
  } else {
    emailHelp.textContent = "";
  }
});

function validarSenha(senha) {
  // Verifica se a senha tem entre 6 e 20 caracteres
  if (senha.length < 6 || senha.length > 20) {
    return "Senha inválida";
  }

  // Verifica se a senha contém pelo menos um caractere especial, um número e uma letra
  const regexEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const regexNumero = /[0-9]+/;
  const regexLetra = /[a-zA-Z]+/;

  if (
    !regexEspecial.test(senha) ||
    !regexNumero.test(senha) ||
    !regexLetra.test(senha)
  ) {
    return "Senha inválida";
  }

  // Verifica se a senha contém o nome ou ano de nascimento do usuário
  const nomeUsuario = nome.value.split(" ");
  const anoNascimento = ano.value;

  if (
    senha.includes(nomeUsuario[0]) ||
    senha.includes(nomeUsuario[1]) ||
    senha.includes(anoNascimento)
  ) {
    return "Senha inválida";
  }

  // Determina o nível de segurança da senha
  if (senha.length < 8) {
    return "fraca";
  } else if (senha.length <= 12 && senha.match(/[A-Z]/g).length >= 1) {
    return "moderada";
  } else {
    let contadorCaracteresEspeciais = 0;
    let contadorNumeros = 0;
    let contadorLetrasMaiusculas = 0;

    for (let i = 0; i < senha.length; i++) {
      const caractere = senha[i];
      if (regexEspecial.test(caractere)) {
        contadorCaracteresEspeciais++;
      } else if (regexNumero.test(caractere)) {
        contadorNumeros++;
      } else if (/[A-Z]/.test(caractere)) {
        contadorLetrasMaiusculas++;
      }
    }

    if (
      contadorCaracteresEspeciais > 1 &&
      contadorNumeros > 1 &&
      contadorLetrasMaiusculas > 1
    ) {
      return "forte";
    }
  }
  //não sei o que retornar quando a senha não faz parte de nenhum dos níveis, então coloquei como fraca
  return "fraca";
}

senha.addEventListener("focusout", () => {
  const nivelSeguranca = validarSenha(senha.value);
  if (nivelSeguranca === "Senha inválida") {
    senhaHelp.textContent = "Senha inválida";
    senhaHelp.style.color = "red";
    meter.value = 0;
  } else if (nivelSeguranca === "fraca") {
    senhaHelp.textContent = "Senha " + nivelSeguranca;
    senhaHelp.style.color = "red";
    meter.value = 10;
    meter.style.color = "red";
  } else if (nivelSeguranca === "moderada") {
    senhaHelp.textContent = "Senha " + nivelSeguranca;
    senhaHelp.style.color = "orange";
    meter.value = 20;
    meter.style.color = "orange";
  } else if (nivelSeguranca === "forte") {
    senhaHelp.textContent = "Senha " + nivelSeguranca;
    senhaHelp.style.color = "green";
    meter.value = 30;
    meter.style.color = "green";
  }
});

buttonSend.addEventListener("click", () => {
  if (
    nomeHelp.textContent != "" ||
    anoHelp.textContent != "" ||
    emailHelp.textContent != "" ||
    (senhaHelp.textContent != "" &&
      senhaHelp.textContent != "Senha fraca" &&
      senhaHelp.textContent != "Senha moderada" &&
      senhaHelp.textContent != "Senha forte")
  ) {
    sendHelp.textContent = "Seus dados não foram registrados";
    sendHelp.style.color = "red";
  } else {
    sendHelp.textContent = "Seus dados foram registrados";
    sendHelp.style.color = "green";
  }
});
