import Card from "./card.js";

import FormValidator from "./FormValidator.js";

import { closePopup } from "./utils.js";

const cardZone = document.querySelector(".elements");
const buttonAddCard = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#popup-card");
const formCardPopup = document.querySelector(".popup__card-form");
const inputCardTitle = document.querySelector(".popup__card-title");
const inputUrl = document.querySelector(".popup__card-url");
const buttonCloseAddCard = document.querySelector(".popup__card-button-closed");

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

initialCards.forEach((item) => {
  const card = new Card(item, ".template-card"); //const template = document.querySelector(".template-card");
  const cardElement = card.generateCard();

  cardZone.append(cardElement);
});

formCardPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title");
  const linkInput = document.querySelector("#image-link");

  const titleValue = inputCardTitle.value;
  const linkValue = inputUrl.value;

  const newCardData = {
    name: titleValue,
    link: linkValue,
  };

  const card = new Card(newCardData, ".template-card"); //const template = document.querySelector(".template-card");
  const cardElement = card.generateCard();

  cardZone.prepend(cardElement);

  closePopup(cardPopup);
});

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
};

const forms = Array.from(
  document.querySelectorAll(validationSettings.formSelector)
);
forms.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidator.enableValidation();
});

const popupOverlay = document.querySelectorAll(".popup__overlay");
popupOverlay.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    closePopup(overlay.parentNode);
  });
});
