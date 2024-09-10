import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._formElement = document.querySelector(".popup__confirmation-form");
  }

  setEventListeners() {
    super.setEventListeners();
    document
      .querySelector(".popup__confirmation-form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleConfirmation(this._card);
        super.closePopup();
      });
  }

  openPopup(card) {
    super.openPopup();
    this._card = card;
  }
}
