import './index.css';
import Api from '../components/Api';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithImage from '../components/PopupWithImage';
import PopupDelete from '../components/PopupDelete';
import {
  templateSelector,
  config,
  buttonEditPopupOpen,
  buttonAddPopupOpen,
  formAddElement,
  formProfileElement,
  formAvatarElement,
  buttonEditAvatarPopupOpen
} from '../utils/constants';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'e8966b1f-d3a5-42d7-8115-fffa97d27cf8',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getInfoUser(), api.getCards()])
  .then(([infoUser, cards]) => {
    userInfo.setUserInfo(infoUser);
    userId = infoUser._id;
    cardsList.renderer(cards);
  })
  .catch(err => console.log(`Ошибка ${err}`))


const userInfo = new UserInfo({
  name: '.profile__title',
  about: '.profile__subtitle',
  avatar: '.profile__avatar'
});


const bigImage = new PopupWithImage('.popup_big-image');
bigImage.setEventListeners();

const handleFormProfileSubmit = (formValues) => {
  editProfileForm.setButtonText('Сохранение...');
  api.editUser(formValues)
    .then((data) => { userInfo.setUserInfo(data) })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      editProfileForm.setButtonText('Сохранить');
      editProfileForm.close();
    });
}

const validatorAddElement = new FormValidator(config, formAddElement);
validatorAddElement.enableValidation();
validatorAddElement.disableButton();

const validatorProfileElement = new FormValidator(config, formProfileElement);
validatorProfileElement.enableValidation();

const validatorAvatarElement = new FormValidator(config, formAvatarElement);
validatorAvatarElement.enableValidation();

const editProfileForm = new PopupWithForm('.popup_edit-profile', handleFormProfileSubmit);

const handleFormAvatarSubmit = (formValues) => {
  editAvatarForm.setButtonText('Сохранение...');
  api.editAvatar(formValues)
    .then(res => { userInfo.setUserInfo(res); })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      editAvatarForm.setButtonText('Сохранить');
      validatorAvatarElement.disableButton();
      editAvatarForm.close();
    });
};

const handleSubmitAddCardForm = (formValues) => {
  addCardForm.setButtonText('Сохранение...');
  api.addNewCard(formValues)
    .then(res => {cardsList.addItemPrepend(createCard(res))})
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        addCardForm.setButtonText('Сохранить');
        addCardForm.close();
      });
};


const editAvatarForm = new PopupWithForm('.popup_edit-avatar', handleFormAvatarSubmit);
editAvatarForm.setEventListeners();
buttonEditAvatarPopupOpen.addEventListener('click', () => {
  editAvatarForm.open();
  validatorAvatarElement.resetValidation();
  validatorAvatarElement.disableButton();
});

buttonEditPopupOpen.addEventListener('click', () => {
  editProfileForm.open();
  validatorProfileElement.resetValidation();
  validatorProfileElement.disableButton();
  editProfileForm.setInputValues(userInfo.getUserInfo());
});
editProfileForm.setEventListeners();

const hendelClickCard = (title, image) => {
  bigImage.open(title, image);
};

function createCard(data) {
  const card = new Card({
    data,
    templateSelector,
    userId,
    hendelClickCard,
    hendelDeletCard: () => {
      deleteCardPopup.setConfirmation(() => {
        api.deleteCard(data._id)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => console.log(`Ошибка ${err}`));
      }),
        deleteCardPopup.open();
    },
    handleLikeCard: () => {
      if (!card.isLike()) {
        api.addLike(data._id)
          .then((res) => {
            card.handleLike(res.likes)
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`)
          })
      } else {
        api.deleteLike(data._id)
          .then((res) => {
            card.handleLike(res.likes)
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`)
          })
      }
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

const cardsList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card)
  },
},
  '.cards'
);

const deleteCardPopup = new PopupDelete('.popup_delete-card');
deleteCardPopup.setEventListeners();

const addCardForm = new PopupWithForm('.popup_new-card', handleSubmitAddCardForm);

buttonAddPopupOpen.addEventListener('click', () => {
  addCardForm.open();
  validatorAddElement.disableButton();
  validatorAddElement.resetValidation();
});
addCardForm.setEventListeners();

