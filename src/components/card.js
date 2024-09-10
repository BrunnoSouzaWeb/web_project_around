export default class Card {
  constructor(
    item,
    idUser,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    handleDislikeCard
  ) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;

    this._idOwnerCard = item.owner._id;
    this._idCard = item._id;

    this._idUser = idUser;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;

    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__title").textContent = this._name;

    this._element.querySelector(".elements__count-like").textContent =
      this._likes.length;

    this._likeButton = this._element.querySelector(".elements__image-like");

    const userHasLiked = this._likes.find((item) => item._id === this._idUser);

    if (userHasLiked) {
      this._likeButton.classList.toggle("elements__image-like_active");
    }

    if (this._idOwnerCard !== this._idUser) {
      this._element.querySelector(".elements__image-trash").style.display =
        "none";
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    if (this._idOwnerCard === this._idUser) {
      this._element
        .querySelector(".elements__image-trash")
        .addEventListener("click", () => {
          this._handleDeleteCard();
        });
    }

    this._likeButton.addEventListener("click", () => {
      if (this._likes.some((item) => item._id === this._idUser)) {
        this._handleDislikeCard(this._idCard).then((cardWithLike) => {
          this._changeLikeCounter(cardWithLike.likes);
        });
        this._likeButton.classList.toggle("elements__image-like_active");
      } else {
        this._handleLikeCard(this._idCard).then((cardWithLike) => {
          this._changeLikeCounter(cardWithLike.likes);
        });
        this._likeButton.classList.toggle("elements__image-like_active");
      }
    });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._showCardPopupClick();
      });
  }

  _showCardPopupClick() {
    this._handleCardClick(this._name, this._link);
  }

  remove() {
    this._element.remove();
  }

  _changeLikeCounter(newArrayLikes) {
    this._likes = newArrayLikes;

    this._element.querySelector(".elements__count-like").textContent =
      newArrayLikes.length;
  }
}
