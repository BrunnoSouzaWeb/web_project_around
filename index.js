// elementos DOM aqui eu crio uma variavel //

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__container-closebutton");
const formElement = document.querySelector(".popup__container");

function openPopUp() {
  let popup = document.querySelector(".popup");

  popup.classList.add("popup__opened");
}

function closePopUp() {
  const popup = document.querySelector(".popup");

  popup.classList.remove("popup__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //evita o recarregamento da página//

  // aqui memoriza os dados que digitei //
  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#job").value;

  // imprimir os dados, porem precisa ligar//
  console.log(nameInput, jobInput);

  //local onde será exibido //
  const userName = document.querySelector(".profile__name");
  const userJob = document.querySelector(".profile__job");

  // define os lugares que vai imprimir o nome e trabalho, subistituindo ooque tinha antes//
  userName.textContent = nameInput;
  userJob.textContent = jobInput;

  closePopUp(); //fecha o formulario//
}

// quando o botão open é clicado ele puxa a função openPopUp e abre o formulário //
// de acordo com o que o thiago me ajudou, o addeventlistener é padrão //
editButton.addEventListener("click", openPopUp);
closeButton.addEventListener("click", closePopUp);
formElement.addEventListener("submit", handleProfileFormSubmit);
