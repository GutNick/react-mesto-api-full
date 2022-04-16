import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Register(props) {
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
        console.log(email)
        props.onAuthorization(email, password);
    }
    return (
        <section className="authorization" onSubmit={handleSubmit}>
            <h2 className="authorization__title">Регистрация</h2>
            <form className="form authorization__form">
                <input type="email" className="form__input" placeholder="Email" onChange={handleChange} value={email} autoComplete="email" required />
                <input type="password" className="form__input" placeholder="Пароль" autoComplete="new-password" value={password} id="new-password" onChange={handleChange} required />
                <button type="submit" className="form__submit">Зарегистрироваться</button>
            </form>
            <p className="authorization__description">Уже зарегистрированы? <Link to="/sign-in" className="authorization__link">Войти</Link></p>
        </section>
    )
}

export default withRouter(Register);