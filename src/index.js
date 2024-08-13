import "./pages/index.css";

import Section from "./components/Section.js";

import Card from "./components/card.js";

import PopupWithImage from "./components/PopupWithImage.js";

import PopUpWithForm from "./components/PopupWithForm.js";

import FormValidator from "./components/FormValidator.js";

import UserInfo from "./components/UserInfo.js";

const userInfo = new UserInfo({
  name: ".profile__text",
  title: ".profile__profession",
});

const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", () => {
  popupFormPerfil.openPopup(".popup");
});

const handleSubmitPerfilForm = ({ name, description }) => {
  userInfo.setUserInfo({ name, title: description });
  popupFormPerfil.closePopup();
};

const popupFormPerfil = new PopUpWithForm(
  "#popup-perfil",
  handleSubmitPerfilForm
);

popupFormPerfil.setEventListeners();

const closeButton = document.querySelector(".popup__button-closed");

closeButton.addEventListener("click", () => {
  popupFormPerfil.closePopup(".popup");
});

const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__description");
const saveButton = document.querySelector(".popup__button-create");
const profileText = document.querySelector(".profile__text");
const profileProfession = document.querySelector(".profile__profession");

const handleSubmitPopCard = ({ title, link }) => {
  const titleInput = document.querySelector("#input-title").value;
  const imageLinkInput = document.querySelector("#input-url").value;

  const cardNovo = new Section(
    {
      items: [{ name: titleInput, link: imageLinkInput }],
      renderer: (item) => {
        const popupImage = new PopupWithImage(
          item.name,
          item.link,
          "#popup-image"
        );

        const card = new Card(item, ".template-card", () =>
          popupImage.openPopup(item.name, item.link)
        );

        const cardElement = card.generateCard();
        cardNovo.addOneItem(cardElement);
      },
    },
    ".elements"
  );

  cardNovo.renderItems();
  popupFormCard.closePopup();
};

const popupFormCard = new PopUpWithForm("#popup-card", handleSubmitPopCard);

popupFormCard.setEventListeners();

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonCloseAddCard = document.querySelector(".popup__card-button-closed");

buttonAddCard.addEventListener("click", () => {
  popupFormCard.openPopup("#popup-card");
});

buttonCloseAddCard.addEventListener("click", () => {
  popupFormCard.closePopup();
});

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

const cardZone = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const popupImage = new PopupWithImage(
        item.name,
        item.link,
        "#popup-image"
      );

      popupImage.setEventListeners();

      const card = new Card(item, ".template-card", () =>
        popupImage.openPopup(item.name, item.link)
      );

      const cardElement = card.generateCard();
      cardZone.addItem(cardElement);
    },
  },
  ".elements"
);

cardZone.renderItems();

const formElement = document.querySelector("#form-perfil");
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidatorPerfil = new FormValidator(settings, formElement);
formValidatorPerfil.enableValidation();

const formElementCardNovo = document.querySelector("#form-card");
const formValidatorCardNovo = new FormValidator(settings, formElementCardNovo);
formValidatorCardNovo.enableValidation();
