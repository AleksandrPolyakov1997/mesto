export class Card {
  constructor({data, templateSelector, userId, hendelClickCard, hendelDeletCard, handleLikeCard}){
    this._title = data.name;
    this._image = data.link;
    this._cardId = data._id
    this._ownerId = data.owner._id;
    this._like = data.likes
    this._hendelClickCard = hendelClickCard;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._hendelDeletCard = hendelDeletCard;
    this._handleLikeCard = handleLikeCard;

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

    this._deleteTrashButton();
    this._setLike();
    this._likeCount = this._element.querySelector('.card__like-count')
    this._likeCount.textContent = this._like.length;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__remove-button').addEventListener('click', () => {
      this._hendelDeletCard();
    });

    this._cardLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._hendelClickCard(this._title, this._image);
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  handleLike(data) {
    this._likeCount.textContent = data.length;
    this._cardLike.classList.toggle('card__like_checked');
  }

  _deleteTrashButton() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.card__remove-button').remove();
    }
  }

  _setLike() {
    if (this.isLike()) {
      this._cardLike.classList.add('card__like_checked')
    }
  }

  isLike() {
    return this._like.some(item => item._id === this._userId);
  }
}

