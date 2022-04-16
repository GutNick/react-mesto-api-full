import React from "react";
import union__success from "../images/union__success.svg"
import union__fail from "../images/union__fail.svg"

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img src={props.isSuccess ? union__success : union__fail} alt="Успешно" className="popup__info-tooltip-img"/>
                <p className="popup__info-tooltip-text">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                <button className="popup__button-close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;