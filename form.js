const confirmarPedido = document.querySelector(".correct");
const cancelarPedido = document.querySelector(".cancelar");
const closeBottom = document.querySelector(".close-bottom");
const overlay = document.querySelector(".overlay");
const popUp = document.querySelector(".pop-up");
const popUpConfirmation = document.querySelector(".pop-up-confirmacao");
const usuario = [];
const cardapio = [];
const pedidoGerado = [];

document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();

  usuario.push(document.querySelector("#username"));
  usuario.push(document.querySelector("#telefone"));
  usuario.push(document.querySelector("#endereco"));
  const [username, telefone, endereco] = usuario;

  cardapio.push(document.querySelector(".cardapioOptions"));
  cardapio.push(document.querySelector(".bebidasOptions"));
  cardapio.push(document.querySelector(".tamanhoOptions"));
  const [cardapioOptions, bebidasOptions, tamanhoOptions] = cardapio;

  const pedido = [];
  pedido.push(Number(document.querySelector("#cardapio").value));
  pedido.push(Number(document.querySelector("#bebidas").value));
  pedido.push(Number(document.querySelector("#tamanho").value));
  const [pizzaIndex, bebidasIndex, tamanhoIndex] = pedido;

  pedidoGerado.push(document.querySelector(".cliente"));
  pedidoGerado.push(document.querySelector(".lanche"));
  pedidoGerado.push(document.querySelector(".comprimento"));
  pedidoGerado.push(document.querySelector(".refresco"));
  pedidoGerado.push(document.querySelector(".localizacao"));
  pedidoGerado.push(document.querySelector(".preco"));

  let [
    clienteInput,
    pizzaInput,
    tamanhoInput,
    bebidaInput,
    enderecoInput,
    precoTotal,
  ] = pedidoGerado;

  const usernameValue = username.value.trim();
  const telefoneValue = telefone.value.trim();
  const enderecoValue = endereco.value.trim();

  let formValidation = 0;

  if (usernameValue === "") {
    setErrorFor(username, "Campo Vazio");
    formValidation = 0;
  } else {
    setSuccessFor(username);
    formValidation++;
  }
  if (telefoneValue === "") {
    setErrorFor(telefone, "Campo Vazio");
    formValidation = 0;
  } else if (isNaN(telefoneValue)) {
    setErrorFor(telefone, "Favor usar números");
    formValidation = 0;
  } else if (telefoneValue.length <= 5) {
    setErrorFor(telefone, "Número de celular muito curto");
    formValidation = 0;
  } else {
    setSuccessFor(telefone);
    formValidation++;
  }

  if (enderecoValue === "") {
    setErrorFor(endereco, "Campo vazio");
    formValidation = 0;
  } else if (enderecoValue.length < 10) {
    setErrorFor(endereco, "Precisamos de mais informações");
  } else {
    setSuccessFor(endereco);
    formValidation++;
    if (formValidation >= 3) {
      //check Opions
      if (
        cardapioOptions.value === "" ||
        bebidasOptions.value === "" ||
        tamanhoOptions.value === ""
      ) {
        alert("por favor Selecione o Seu Lanche");
      } else {
        openModal(overlay, popUp);
        restaurant.order({
          cliente: usernameValue,
          telefone: telefoneValue,
          endereco: enderecoValue,
          comida: pizzaIndex,
          bebidas: bebidasIndex,
          largura: tamanhoIndex,
          clienteHost: clienteInput,
          lancheHost: pizzaInput,
          tamanhoHost: tamanhoInput,
          bebidaHost: bebidaInput,
          enderecoHost: enderecoInput,
          precoHost: precoTotal,
        });
        resetForm();
      }
    }
  }
});

cancelarPedido.addEventListener("click", () => {
  closeModal(overlay, popUp);
  resetPopUp();
});

closeBottom.addEventListener("click", () => {
  closeModal(overlay, popUpConfirmation);
});

confirmarPedido.addEventListener("click", () => {
  closeModal(overlay, popUp);
  openModal(overlay, popUpConfirmation);
  resetPopUp();
});

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.textContent = "";
  input.parentElement.classList.remove("error");
  input.parentElement.classList.add("success");
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.textContent = message;

  input.parentElement.classList.remove("success");
  input.parentElement.classList.add("error");
}

function openModal(modal, popUp) {
  modal.classList.add("active");
  popUp.classList.add("active");
}

function closeModal(modal, popUp) {
  popUp.classList.remove("active");
  modal.classList.remove("active");
}

function resetPopUp() {
  pedidoGerado.forEach((item) => {
    item.innerHTML = "";
  });
}

function resetForm() {
  usuario.forEach((item) => {
    item.value = "";
  });

  cardapio.forEach((item) => {
    item.value = "";
  });
}

const restaurant = {
  nome: "Pizzaria",
  cardapio: [
    { nome: "Pizza", sabor: "Calabresa", preco: 30 },
    { nome: "Pizza", sabor: "Mozarela", preco: 30 },
    { nome: "Pizza", sabor: "Portuguesa", preco: 40 },
    { nome: "Pizza", sabor: "Frango com Catupity", preco: 50 },
    { nome: "Pizza", sabor: "Mista", preco: 40 },
    { nome: "Pizza", sabor: "Marguerita", preco: 50 },
  ],
  bebida: [
    { nome: "Regrigerante", sabor: "Não solicitado" },
    { nome: "Regrigerante", sabor: "Coca Cola", preco: 9 },
    { nome: "Regrigerante", sabor: "Pepsi", preco: 9 },
    { nome: "Regrigerante", sabor: "Fanta Uva", preco: 7 },
    { nome: "Refrigerante", sabor: "Fanta Laranja", preco: 7 },
    { nome: "Suco", sabor: "Suco de Laranja", preco: 5 },
    { nome: "Suco", sabor: "Suco de Maracuja", preco: 5 },
    { nome: "Suco", sabor: " Suco Limão", preco: 5 },
  ],
  tamanho: [
    { nome: "Gigante", preco: 50 },
    { nome: "Grande", preco: 40 },
    { nome: "Média", preco: 30 },
    { nome: "Pequena", preco: 20 },
  ],
  order: function ({
    cliente,
    telefone,
    endereco,
    comida,
    bebidas,
    largura,
    clienteHost,
    lancheHost,
    tamanhoHost,
    bebidaHost,
    enderecoHost,
    precoHost,
  }) {
    ` ${(clienteHost.innerHTML += cliente)}
    ${(lancheHost.innerHTML += this.cardapio[comida].sabor)}
    ${(tamanhoHost.innerHTML += this.tamanho[largura].nome)}
    ${(bebidaHost.innerHTML += this.bebida[bebidas].sabor)}
    ${(enderecoHost.innerHTML += endereco)}
    ${(precoHost.innerHTML +=
      this.tamanho[largura].preco + this.bebida[bebidas].preco)}
    `;
  },
};
