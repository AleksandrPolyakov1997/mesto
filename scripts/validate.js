const checkInputValidity = (input, config) => {
  const error = document.querySelector(`.${input.name}-error`);

  if(input.validity.valid) {
      error.textContent = '';
      error.classList.remove(config.errorClass);
      input.classList.remove(config.inputErrorClass);
      
  } else {
      error.textContent = input.validationMessage;
      error.classList.add(config.errorClass);
      input.classList.add(config.inputErrorClass);
  }
}

const toggleButton = (inputs, button) => {
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
  
      form.addEventListener('submit', (e) => {
          e.preventDefault();
      })
  
      inputs.forEach(input => {
          input.addEventListener('input', () => {
              checkInputValidity(input, restConfig);
              
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