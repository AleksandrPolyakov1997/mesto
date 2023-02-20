import { data } from "autoprefixer";

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInfoUser() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(err => console.log(`Ошибка: ${err} ${res.status}`));
  }

  editUser(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(err => console.log(`Ошибка: ${err} ${res.status}`));
  }

  getCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(err => console.log(`Ошибка: ${err} ${res.status}`));
  }

  addNewCard(data) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(err => console.log(`Ошибка: ${err} ${res.status}`));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(err => console.log(`Ошибка: ${err} ${res.status}`));
  }

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(err => console.log(`Ошибка: ${err} ${res.status}`));
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(err => console.log(`Ошибка: ${err} ${res.status}`));
  }

  editAvatar(link) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    }
    )
  }
}

