export class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = formSelector;
  }

  enableValidation() {
    this._setEvenListeners();
  }

  _checkInputValidity(input) {
    if(input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    const errorElement = this._formSelector.querySelector(`.${input.name}-error`);

    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formSelector.querySelector(`.${input.name}-error`);
  
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _toggleButton(inputList, button) {
    const isFormValid = inputList.every(input => input.validity.valid);

    if(isFormValid) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = '';
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }

  _setEvenListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    const button = this._formSelector.querySelector(this._submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton(inputList, button);
      })
    })
  }
}