import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithImage from '../components/PopupWithImage';
import { 
  initialCards,
  config,
  buttonEditPopupOpen,
  buttonAddPopupOpen,
  formAddElement,
  formProfileElement
  } from '../utils/constants'; 

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const bigImage = new PopupWithImage('.popup_big-image');
bigImage.setEventListeners();

const handleFormProfileSubmit = (formValues) => {
    userInfo.setUserInfo(formValues.name, formValues.job);
    editProfileForm.close();
}

const validatorAddElement = new FormValidator(config, formAddElement);
validatorAddElement.enableValidation();

const validatorProfileElement = new FormValidator(config, formProfileElement);
validatorProfileElement.enableValidation();

const editProfileForm = new PopupWithForm('.popup_edit-profile', handleFormProfileSubmit);

buttonEditPopupOpen.addEventListener('click', () => {
  editProfileForm.open();
  editProfileForm.setInputValues(userInfo.getUserInfo());
});
editProfileForm.setEventListeners();

const hendelClickCard = (title, image) => {
  bigImage.open(title, image);
};

function createCard(item) {
  const card = new Card(item.name, item.link, '#card', hendelClickCard);
  const cardElement = card.generateCard();

  return cardElement;
}

const handleSubmitAddCardForm = (formValues) => {
  const card = createCard(formValues);
  console.log(card)
  cardsList.addItem(card);
  validatorAddElement.disableButton();
  addCardForm.close();
};

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
  },
},
'.cards'
);

cardsList.renderer();

const addCardForm = new PopupWithForm('.popup_new-card', handleSubmitAddCardForm);

buttonAddPopupOpen.addEventListener('click', () => addCardForm.open());
addCardForm.setEventListeners();