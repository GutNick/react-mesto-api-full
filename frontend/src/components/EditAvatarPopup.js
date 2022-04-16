import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const inputRef = React.useRef('');
    React.useEffect(() => {
        inputRef.current.value = '';
    }, [props.isOpen]);
    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }
    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            buttonTitle={props.isLoading ? "Сохранение..." : "Сохранить"}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input className="popup__field popup__field_input_name" id="popup__avatar" name="avatar" type="url"
                       placeholder="Url" autoComplete="off" minLength="2" required ref={inputRef}/>
                <span id="popup__avatar-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup