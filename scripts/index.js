const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name-input');
let jobInput = formElement.querySelector('.popup__job-input');

function openPopup() {
  popup.classList.add('popup__open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup__open');
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 