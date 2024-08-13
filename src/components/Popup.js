export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupImage = document.querySelector(this._popupSelector);
  }

  handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      const openPopups = document.querySelectorAll(".popup__open");
      openPopups.forEach((popup) => closePopup(popup));
    }
  }

  openPopup() {
    this._popupImage.classList.add("popup__open");
  }

  closePopup() {
    this._popupImage.classList.remove("popup__open");
    if (document.querySelectorAll(".popup__open").length === 0) {
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    const buttonClosePopupImage = document.querySelector(
      ".popup__image-button-closed"
    );

    buttonClosePopupImage.addEventListener("click", () => {
      this.closePopup();
    });

    const popupOverlay = document.querySelectorAll(".popup__overlay");
    popupOverlay.forEach((overlay) => {
      overlay.addEventListener("click", () => {
        this.closePopup();
      });
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
