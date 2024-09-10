import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    const inputValues = {};
    const inputForms = Array.from(form.elements);
    inputForms.forEach((element) => {
      if (element.name) {
        inputValues[element.name] = element.value;
      }
    });

    return inputValues;
  }

  closePopup() {
    super.closePopup();
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
  }

  defineTextButton() {
    const textButton = document
      .querySelector(this._popupSelector)
      .querySelector(".popup__button");

    let defineText = "";
    if (textButton.textContent.trim() === "Salvar") {
      defineText = "Salvando...";
    } else if (textButton.textContent.trim() === "Salvando...") {
      defineText = "Salvar";
    }
    textButton.textContent = defineText;
  }

  setEventListeners() {
    super.setEventListeners();
    const popupOpen = document.querySelector(this._popupSelector);
    const form = popupOpen.querySelector("form");
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.defineTextButton();
      this._handleSubmit(this._getInputValues());
    });
  }
}
