import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  openPopup(name, link) {
    super.openPopup();

    const popupPhoto = document.querySelector(".popup__image-photo");

    const popupTitle = document.querySelector(".popup__image-name");

    popupPhoto.src = this._link;
    popupTitle.textContent = this._name;
    this.alt = this._name;
  }
}
