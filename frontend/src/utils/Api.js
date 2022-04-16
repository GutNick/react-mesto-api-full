class Api {
    constructor({ url }) {
        this._url = url;
    }

    _handleRes(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfile() {
        const token  = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._handleRes)
    }

    setUserInfo(data) {
        const token  = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }
        )
            .then(this._handleRes)
    }

    changeAvatar(avatar) {
        const token  = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            body: JSON.stringify({
                avatar: avatar.avatar
            })
        }
        )
            .then(this._handleRes)
    }

    getInitialCards() {
        const token  = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._handleRes)
    }

    getAllData() {
        return Promise.all([this.getProfile(), this.getInitialCards()])
    }



    setCard(card) {
        const token  = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards`, {
            method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        }
        )
            .then(this._handleRes)
    }

    changeLikeCardStatus(id, isLiked) {
        const token  = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: (isLiked ? "PUT" : "DELETE"),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._handleRes)
    }

    deleteCard(id) {
        const token  = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
        }
        )
            .then(this._handleRes)
    }
}
const api = new Api({
    url: 'https://api.mesto.gutman.nomoredomains.work',
    // url: 'http://localhost:3001',
});

export default api;