import { renderLoading } from "./utils.js";

class Api {
  constructor({ address}) {    
    this._address = address;
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: localStorage.getItem("jwt")
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))      
      .catch(err => console.log(`Загрузка карточек: ${err}`))
  }

  getUsers() {
    return fetch(`${this._address}/users`, {
      headers: {
        authorization: localStorage.getItem("jwt")
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Загрузка друзей: ${err}`))
  }

  addCard({ name, link }) {
    // renderLoading(true);

    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))      
      .catch(err => console.log(`Добавление карточки: ${err}`));
  }

  removeCard(cardID) {
    return fetch(`${this._address}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem("jwt"),
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`При удалении карточки: ${err}`));
  }

  getUserInfo() { 
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: localStorage.getItem("jwt")
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Загрузка информации о пользователе: ${err}`))
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`При обновлении информации о пользователе: ${err}`));
  }

  setUserAvatar({ avatar }) {
    
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`При изменении аватара пользователя: ${err}`));
  }

  changeLikeCardStatus(cardID, like) {
    
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._address}/cards/likes/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Изменения статуса лайка: ${err}`));
  }
}

const api = new Api({
  address: 'https://travlrsapi.herokuapp.com'
})

export default api;


// address: 'https://praktikum.tk',
//   groupId: `cohort0`,
//   token: `80a75492-21c5-4330-a02f-308029e94b63`,