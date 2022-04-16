import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${(!!props.card.name && !!props.card.link) ? `popup_opened` : ''}`}>
      <div className="popup__wrapper">
        <img className="popup__img" src={props.card.link} alt={props.card.name} />
        <p className="popup__text">{props.card.name}</p>
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;