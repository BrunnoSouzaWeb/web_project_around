import { openPopup } from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__image-trash")
      .addEventListener("click", () => {
        this._deleteCardClick();
      });

    this._element
      .querySelector(".elements__image-like")
      .addEventListener("click", () => {
        this._likeHandleClick();
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._showCardPopupClick();
      });
  }

  _deleteCardClick() {
    this._element.remove();
  }

  _likeHandleClick() {
    this._element
      .querySelector(".elements__image-like")
      .classList.toggle("elements__image-like_active");
  }

  _showCardPopupClick() {
    const popupImage = document.querySelector("#popup-image");
    openPopup(popupImage);
    const popupPhoto = popupImage.querySelector(".popup__image-photo");
    const popupTitle = popupImage.querySelector(".popup__image-name");

    popupPhoto.src = this._link;
    popupTitle.textContent = this._name;
    this.alt = this._name;
  }
}
