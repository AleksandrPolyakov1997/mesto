export default class UserInfo {
  constructor({name, about, avatar}) {
    this._userName = document.querySelector(name);
    this._userJob = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
    

    this._inputName = document.querySelector('.popup__input_form_name');
    this._inputJob = document.querySelector('.popup__input_form_job');

  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}