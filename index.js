//Botão de adicionar
const addCardButton = document.querySelector(".profile__add-button");

const saveCardButton = document.querySelector(
  ".popup-add-card__container-button"
);

const closeCardButton = document.querySelector(
  ".popup-add-card__container-closebutton"
);

const formCardElement = document.querySelector(".popup-add-card__container");

function openCardPopUp() {
  const popup = document.querySelector(".popup-add-card");

  popup.classList.add("popup__opened");
}

function closeCardPopUp() {
  const popup = document.querySelector(".popup-add-card");

  popup.classList.remove("popup__opened");
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const linkInput = document.querySelector("#link-input").value;

  //console.log(titleInput);
  //console.log(linkInput);

  closeCardPopUp();
}

addCardButton.addEventListener("click", openCardPopUp);
closeCardButton.addEventListener("click", closeCardPopUp);
formCardElement.addEventListener("submit", handleCardFormSubmit);

const formAddCard = document.querySelector(".popup-add-card__container");
const titleInput = document.querySelector("#title");
const linkInput = document.querySelector("#link-input");

formAddCard.addEventListener("submit", function () {
  const title = titleInput.value;
  const link = linkInput.value;
  const createdCard = createCard(title, link);
  cardArea.prepend(createdCard);
  formAddCard.reset();
  closeCardPopUp();
});

//Cards
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const template = document.querySelector(".elements__template");
const cardArea = document.querySelector(".elements__cards");

function createCard(name, link) {
  const card = template
    .cloneNode(true)
    .content.querySelector(".elements__card");
  const cardImage = card.querySelector(".elements__image");
  const cardText = card.querySelector(".elements__title");
  const cardTrashButton = card.querySelector(".elements__button_type_trash");
  const cardLikeButton = card.querySelector(".elements__button_type_like");
  const cardWindow = card.querySelector(".elements__window");
  const buttonCardImage = card.querySelector(".elements__image-button");
  const cardWindowImage = card.querySelector(".elements__window-image");
  const cardWindowName = card.querySelector(".elements__window-name");
  const windowCloseButton = card.querySelector("#window-close-button");

  cardImage.src = link;
  cardText.textContent = name;
  cardImage.alt = name;
  cardWindowImage.src = link;
  cardWindowImage.alt = name;
  cardWindowName.textContent = name;

  // Cria o manipulador de evento associado ao evento "click" do botão de excluir o cartão
  cardTrashButton.addEventListener("click", function () {
    card.remove();
  });

  // Cria o manipulador de evento associado ao botão de curtir do cartão
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("elements__button_type_like-active");
  });

  // Cria o manipulador de evento associado ao evento "click" na imagem do cartão abrindo a janela do cartão
  buttonCardImage.addEventListener("click", function () {
    cardWindow.classList.toggle("elements__window_opened");
  });

  // Cria o manipulador de evento associado ao evento "click" no botão "Fechar" da janela do cartão
  windowCloseButton.addEventListener("click", function () {
    cardWindow.classList.remove("elements__window_opened");
  });

  return card;
}

initialCards.forEach(function (element) {
  const firstcards = createCard(element.name, element.link);
  cardArea.append(firstcards);
});

// Parte do Editar Perfil

// elementos DOM aqui eu crio uma variavel //

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__container-closebutton");
const formElement = document.querySelector(".popup__container");

function openPopUp() {
  const popup = document.querySelector(".popup");

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
  // console.log(nameInput, jobInput);

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
