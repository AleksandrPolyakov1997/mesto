import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;

    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(item){
    this._inputList.forEach((input) => {
      input.value = item[input.name];
    });
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
  
      this._handleSubmitForm(this._getInputValues());
    });
  }
}