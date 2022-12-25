const checkInputValidity = (input, form, config) => {

  if(input.validity.valid) {
    showInputError(input, form);
  } else {
    hideInputError(input, form);
  }
}

const showInputError = (input, form, config) => {
  const errorElement = form.querySelector(`.${input.name}-error`);

  errorElement.textContent = '';
  input.classList.remove(config.inputErrorClass);
};

const hideInputError = (input, form, config) => {
  const errorElement = form.querySelector(`.${input.name}-error`);
  
  errorElement.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

const toggleButton = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid);

  if(isFormValid) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = '';
  } else {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = 'disabled';
  }
}

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;
  
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(form => {
      const inputs = [...form.querySelectorAll(inputSelector)];
      const button = form.querySelector(submitButtonSelector);

      toggleButton(inputs, button);
      inputs.forEach(input => {
          input.addEventListener('input', () => {
              checkInputValidity(input, form, restConfig);
              toggleButton(inputs, button);
          });
      })
  })
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(config);