export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderer(items) {
    items.forEach(item => {
      this._renderer(item)

    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }
}