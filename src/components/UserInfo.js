export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      userAvatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    if (data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      if (data.avatar) {
        this._avatar.src = data.avatar;
      }
      if (data._id) {
        this._idUser = data._id;
      }
    }
  }
}
