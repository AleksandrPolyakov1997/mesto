import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);

    this._image = this._popup.querySelector('.popup__big-image');
    this._name = this._popup.querySelector('.popup__image-caption');
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
  }
}