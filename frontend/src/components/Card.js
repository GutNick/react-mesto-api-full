import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__button-delete ${isOwn ? 'element__button-delete_visible' : 'element__button-delete_hidden'}`
    );
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card)
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }
    return (
        <article className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__wrapper">
                <h2 className="element__title">{props.card.name}</h2>
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <p className="element__counter-like">{props.card.likes.length}</p>
            </div>
        </article>
    )
}

export default Card;