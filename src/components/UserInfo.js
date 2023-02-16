export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);

    this._inputName = document.querySelector('.popup__input_form_name');
    this._inputJob = document.querySelector('.popup__input_form_job');

  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}