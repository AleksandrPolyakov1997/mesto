export class Card {
  constructor(title, image, temlateSelector, hendelClickCard){
    this._title = title;
    this._image = image;
    this._hendelClickCard = hendelClickCard;
    this._templateSelector = temlateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__like');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__remove-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._hendelClickCard(this._title, this._image);
    });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._cardLike.classList.toggle('card__like_checked');
  }
}