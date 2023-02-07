export class Card {
  constructor(title, image, hendelClickCard){
    this._title = title;
    this._image = image;
    this._hendelClickCard = hendelClickCard;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#card')
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__remove-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._hendelClickCard(this._title, this._image);
    });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_checked');
  }
}