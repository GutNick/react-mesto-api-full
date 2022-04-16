import React from 'react';
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
    const pathName = useLocation().pathname;
    const path = `${pathName == '/sign-up' ? '/sign-in' : '/sign-up'}`;
    const text = `${pathName == '/sign-up' ? 'Войти' : 'Регистрация'}`;
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип проекта Место" />
            <div className="header__links">
                {props.loggedIn ? <><p className="header__email">{props.email}</p><Link to='/sign-in' className="header__link" onClick={props.handleSignOut}>Выйти</Link></> : <Link to={path} className="header__link">{text}</Link>}
            </div>
        </header>
    )
}

export default Header;