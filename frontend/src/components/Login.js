import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e) {
        if (e.target.type === "email") {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(email, password);
    }
    return (
        <section className="authorization" onSubmit={handleSubmit}>
            <h2 className="authorization__title">Вход</h2>
            <form className="form authorization__form">
                <input type="email" className="form__input" placeholder="Email" autoComplete="username" value={email} onChange={handleChange} required />
                <input type="password" className="form__input" placeholder="Пароль" autoComplete="current-password" value={password} id="current-password" onChange={handleChange} required />
                <button type="submit" className="form__submit">Войти</button>
            </form>
        </section>
    )
}

export default withRouter(Login);