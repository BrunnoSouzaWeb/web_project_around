import "./pages/index.css";

import Section from "./components/Section.js";

import Card from "./components/card.js";

import PopupWithImage from "./components/PopupWithImage.js";

import PopUpWithForm from "./components/PopupWithForm.js";

import PopupWithConfirmation from "./components/PopupWithConfirmation.js";

import FormValidator from "./components/FormValidator.js";

import UserInfo from "./components/UserInfo.js";

import api from "./components/Api.js";

const userInfo = new UserInfo({
  name: ".profile__text",
  about: ".profile__profession",
  avatar: ".profile__image",
});

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);

  api.getInitialCards().then((initialCards) => {
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

          const card = new Card(
            item,
            userInfo._idUser,
            ".template-card",
            () => popupImage.openPopup(item.name, item.link),
            () => popupWithConfirmation.openPopup(card),
            () => api.likeCard(item._id),
            () => api.dislikeCard(item._id)
          );

          const cardElement = card.generateCard();
          cardZone.addItem(cardElement);
        },
      },

      ".elements"
    );

    cardZone.renderItems();
  });
});

const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", () => {
  popupFormPerfil.openPopup();
});

const handleSubmitPerfilForm = ({ name, about }) => {
  api.editPerfil({ name, about }).then(() => {
    userInfo.setUserInfo({ name, about });
    popupFormPerfil.closePopup();
    popupFormPerfil.defineTextButton();
  });
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

const handleSubmitPopCard = ({ title, link }) => {
  const titleInput = document.querySelector("#input-title").value;
  const imageLinkInput = document.querySelector("#input-url").value;

  api.addNewCard({ name: titleInput, link: imageLinkInput }).then((resp) => {
    const cardNovo = new Section(
      {
        items: [{ name: titleInput, link: imageLinkInput }],
        renderer: (item) => {
          const popupImage = new PopupWithImage(
            item.name,
            item.link,
            "#popup-image"
          );

          const card = new Card(
            resp,
            userInfo._idUser,
            ".template-card",
            () => popupImage.openPopup(resp.name, resp.link),
            () => popupWithConfirmation.openPopup(card),
            () => api.likeCard(resp._id),
            () => api.dislikeCard(resp._id)
          );

          const cardElement = card.generateCard();

          cardNovo.addOneItem(cardElement);
        },
      },
      ".elements"
    );

    cardNovo.renderItems();
    popupFormCard.closePopup();
    popupFormCard.defineTextButton();
  });
};

const popupFormCard = new PopUpWithForm("#popup-card", handleSubmitPopCard);

popupFormCard.setEventListeners();

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonCloseAddCard = document.querySelector(".popup__card-button-closed");

buttonAddCard.addEventListener("click", () => {
  popupFormCard.openPopup();
});

buttonCloseAddCard.addEventListener("click", () => {
  popupFormCard.closePopup();
});

const popupWithConfirmation = new PopupWithConfirmation(
  "#popup-confirmation",
  (card) => {
    api.deleteCard(card._idCard).then(() => {
      popupWithConfirmation.closePopup();
      card.remove();
    });
  }
);

popupWithConfirmation.setEventListeners();

const buttonCloseConfirmation = document.querySelector(
  ".popup__confirmation-button-closed"
);

buttonCloseConfirmation.addEventListener("click", () => {
  popupWithConfirmation.closePopup();
});

const popupAvatarProfile = new PopUpWithForm("#popup-avatar", (inputs) => {
  api.editFotoPerfil(inputs).then((result) => {
    userInfo.setUserInfo(result);
    popupAvatarProfile.closePopup();
    popupAvatarProfile.defineTextButton();
  });
});

popupAvatarProfile.setEventListeners();

const avatarButton = document.querySelector(".profile__edit-avatar");
avatarButton.addEventListener("click", function () {
  popupAvatarProfile.openPopup();
});

const buttonCloseAvatar = document.querySelector(
  ".popup__avatar-button-closed"
);

buttonCloseAvatar.addEventListener("click", () => {
  popupAvatarProfile.closePopup();
});

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

const formElementAvatar = document.querySelector("#form-avatar");
const formAvatarPerfil = new FormValidator(settings, formElementAvatar);
formAvatarPerfil.enableValidation();

const formElementCardNovo = document.querySelector("#form-card");
const formValidatorCardNovo = new FormValidator(settings, formElementCardNovo);
formValidatorCardNovo.enableValidation();
