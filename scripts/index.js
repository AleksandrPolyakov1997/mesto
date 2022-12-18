const editPopup = document.querySelector('.popup_edit-profile');
const addPopup = document.querySelector('.popup_new-card');
const bigImagePopup = document.querySelector('.popup_big-image');

const editPopupOpen = document.querySelector('.profile__edit-button');
const addPopupOpen = document.querySelector('.profile__add-button');

const editPopupClose = editPopup.querySelector('.popup__close');
const addPopupClose = addPopup.querySelector('.popup__close');
const bigImagePopupClose = bigImagePopup.querySelector('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const bigImage = bigImagePopup.querySelector('.popup__big-image');
const imageCaption = bigImagePopup.querySelector('.popup__image-caption');
const formAddElement = document.querySelector('.popup__form_add');
const titleInput = formAddElement.querySelector('.popup__input_form_title');
const imageInput = formAddElement.querySelector('.popup__input_form_image');
const formProfileElement = document.querySelector('.popup__form_profile');
const nameInput = formProfileElement.querySelector('.popup__input_form_name');
const jobInput = formProfileElement.querySelector('.popup__input_form_job');

const openPopup = function (popup) {
  popup.classList.add('popup_open');
  keyUpHandler = (e) => handleKeyUp(e, popup);
  document.addEventListener('keyup', keyUpHandler);
  popup.addEventListener('click', (e) => {
    if(!e.target.closest('.popup__content')п) {
      closePopup(e.target.closest('.popup'));
  }
  })
}

const closePopup = function (popup) {
  popup.classList.remove('popup_open');
}

editPopupOpen.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

const handleKeyUp = (e, popup) => {
  if(e.key === 'Escape') {
      closePopup(popup);
  }
}

addPopupOpen.addEventListener('click', () => openPopup(addPopup));

editPopupClose.addEventListener('click', () => closePopup(editPopup));

addPopupClose.addEventListener('click', () => closePopup(addPopup));

bigImagePopupClose.addEventListener('click', () => closePopup(bigImagePopup));

function handleFormProfileSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);
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
const cardTemplate = document.querySelector('#card').content.querySelector('.card');
const cardsElement = document.querySelector('.cards');

function createCard (card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  const deleteButton = cardElement.querySelector('.card__remove-button');
  deleteButton.addEventListener('click', handleDeleteCard);

  const likeButton = cardElement.querySelector('.card__like');
  likeButton.addEventListener('click', handleLikeCard);

  cardImage.addEventListener('click', () => {
    bigImage.src = card.link;
    bigImage.alt = card.name;
    imageCaption.textContent = card.name;
    openPopup(bigImagePopup);
  })

  return cardElement;
}

const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard({ name: titleInput.value, link: imageInput.value })
  titleInput.value = '';
  imageInput.value = '';
  closePopup(addPopup);
};

const renderCard = (card) => {
  cardsElement.prepend(createCard(card));
};

const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
}

const handleLikeCard = (event) => {
  event.target.classList.toggle('card__like_checked');
}

formAddElement.addEventListener("submit", handleSubmitAddCardForm);

initialCards.forEach(function(card){
  const element = createCard(card);
  cardsElement.append(element);
});