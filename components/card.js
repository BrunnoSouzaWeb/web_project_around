export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._handleCardClick(this._name, this._link);
  }
}
