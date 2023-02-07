import { Card } from './card.js';

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

const popupOverlayClose = (popup) => {
  popup.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__content')){
      closePopup(popup);
    }
  })
}

popupOverlayClose(popupEdit);
popupOverlayClose(popupAdd);
popupOverlayClose(popupBigImage);

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
// const cardTemplate = document.querySelector('#card').content.querySelector('.card');
 const cardsElement = document.querySelector('.cards');

// function createCard (card) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardTitle = cardElement.querySelector('.card__title');
//   const cardImage = cardElement.querySelector('.card__image');

//   cardTitle.textContent = card.name;
//   cardImage.alt = card.name;
//   cardImage.src = card.link;

//   const deleteButton = cardElement.querySelector('.card__remove-button');
//   deleteButton.addEventListener('click', handleDeleteCard);

//   const likeButton = cardElement.querySelector('.card__like');
//   likeButton.addEventListener('click', handleLikeCard);

//   cardImage.addEventListener('click', () => {
//     imageBig.src = card.link;
//     imageBig.alt = card.name;
//     imageCaption.textContent = card.name;
//     openPopup(popupBigImage);
//   })

//   return cardElement;
// }

const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard({ name: titleInput.value, link: imageInput.value })
  titleInput.value = '';
  imageInput.value = '';
  event.submitter.classList.add('popup__button-save_invalid');
  event.submitter.setAttribute("disabled", "disabled");
  closePopup(popupAdd);
};

const renderCard = (card) => {
  cardsElement.prepend(createCard(card));
};

// const handleDeleteCard = (event) => {
//   event.target.closest('.card').remove();
// }

// const handleLikeCard = (event) => {
//   event.target.classList.toggle('card__like_checked');
// }

formAddElement.addEventListener("submit", handleSubmitAddCardForm);

// initialCards.forEach(function(card){
//   const element = createCard(card);
//   cardsElement.append(element);
// });

const hendelClickCard = (title, image) => {
  imageBig.src = image;
  imageBig.alt = title;
  imageCaption.textContent = title;
  openPopup(popupBigImage);
};

function createCard(item) {
  const card = new Card(item.name, item.link, hendelClickCard);
  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach((item) => {
  createCard(item);
  cardsElement.append(createCard(item));
});