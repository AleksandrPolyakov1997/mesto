import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupEdit = document.querySelector('.popup_edit-profile');
const popupAdd = document.querySelector('.popup_new-card');
const popupBigImage = document.querySelector('.popup_big-image');

const buttonEditPopupOpen = document.querySelector('.profile__edit-button');
const buttonAddPopupOpen = document.querySelector('.profile__add-button');

const buttonEditPopupClose = popupEdit.querySelector('.popup__close');
const buttonAddPopupClose = popupAdd.querySelector('.popup__close');
const buttonBigImagePopupClose = popupBigImage.querySelector('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const imageBig = popupBigImage.querySelector('.popup__big-image');
const imageCaption = popupBigImage.querySelector('.popup__image-caption');
const formAddElement = document.querySelector('.popup__form_add');
const titleInput = formAddElement.querySelector('.popup__input_form_title');
const imageInput = formAddElement.querySelector('.popup__input_form_image');
const formProfileElement = document.querySelector('.popup__form_profile');
const nameInput = formProfileElement.querySelector('.popup__input_form_name');
const jobInput = formProfileElement.querySelector('.popup__input_form_job');

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup); 
  }
}

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_open')) {
            closePopup(popup)
        }
    })
})

const openPopup = function (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEsc);
}

buttonEditPopupOpen.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

buttonAddPopupOpen.addEventListener('click', () => openPopup(popupAdd));

buttonEditPopupClose.addEventListener('click', () => closePopup(popupEdit));

buttonAddPopupClose.addEventListener('click', () => closePopup(popupAdd));

buttonBigImagePopupClose.addEventListener('click', () => closePopup(popupBigImage));

function handleFormProfileSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

formProfileElement.addEventListener('submit', handleFormProfileSubmit);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const validatorAddElement = new FormValidator(config, formAddElement);
validatorAddElement.enableValidation();

const validatorProfileElement = new FormValidator(config, formProfileElement);
validatorProfileElement.enableValidation();

 const cardsElement = document.querySelector('.cards');

const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard({ name: titleInput.value, link: imageInput.value })
  titleInput.value = '';
  imageInput.value = '';
  validatorAddElement.disableButton();
  closePopup(popupAdd);
};

const renderCard = (card) => {
  cardsElement.prepend(createCard(card));
};

formAddElement.addEventListener("submit", handleSubmitAddCardForm);

const hendelClickCard = (title, image) => {
  imageBig.src = image;
  imageBig.alt = title;
  imageCaption.textContent = title;
  openPopup(popupBigImage);
};

function createCard(item) {
  const card = new Card(item.name, item.link, '#card', hendelClickCard);
  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach((item) => {
  cardsElement.append(createCard(item));
});