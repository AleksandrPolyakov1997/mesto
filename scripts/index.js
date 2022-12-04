const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');

function openPopup() {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_open');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', handleFormSubmit);