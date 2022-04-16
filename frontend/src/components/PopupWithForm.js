import React from "react";

function PopupWithForm(props) {

    return (
            <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__container">
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="popup__form" name={`form-${props.name}`} onSubmit={props.onSubmit}>
                        {props.children}
                        <button className="popup__button" type="submit">{props.buttonTitle}</button>
                    </form>
                    <button className="popup__button-close" type="button" onClick={props.onClose}></button>
                </div>
            </div>
    )
}

export default PopupWithForm;