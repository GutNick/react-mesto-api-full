import React, {useState} from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);
    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            buttonTitle={props.isLoading ? "Сохранение..." : "Сохранить"}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input className="popup__field popup__field_input_name" id="popup__name" name="userName" type="text"
                       placeholder="Ваше имя" autoComplete="off" minLength="2" maxLength="40" required onChange={(e) => setName(e.target.value)} value={name || ''}/>
                <span id="popup__name-error" className="popup__error"></span>
            </label>
            <label className="popup__label">
                <input className="popup__field popup__field_input_job" id="popup__job" name="userJob" type="text"
                       placeholder="Ваша работа" autoComplete="off" minLength="2" maxLength="200" required onChange={(e) => setDescription(e.target.value)} value={description || ''}/>
                <span id="popup__job-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;