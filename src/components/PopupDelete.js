import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(selector ) {
    super(selector);
  }

  setConfirmation(callback) {
    this._confirmation = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.popup__button-delete').addEventListener('click', () => {
      this._confirmation();

    });
  }
}