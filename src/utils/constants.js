export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const buttonEditPopupOpen = document.querySelector('.profile__edit-button');
export const buttonAddPopupOpen = document.querySelector('.profile__add-button');
export const formAddElement = document.querySelector('.popup__form_add');
export const formProfileElement = document.querySelector('.popup__form_profile');
export const formAvatarElement = document.querySelector('.popup__form_avatar');
export const buttonEditAvatarPopupOpen = document.querySelector('.profile__avatar-button');
export const templateSelector = '#card';