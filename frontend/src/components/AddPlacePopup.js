import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    };
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);
    return (
        <PopupWithForm
            name="element"
            title="Новое место"
            isOpen={props.isOpen}
            buttonTitle={props.isLoading ? "Сохранение..." : "Создать"}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input className="popup__field popup__field_input_name" id="popup__elementName" name="elementName"
                       type="text"
                       placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required onChange={(e) => setName(e.target.value)} value={name || ''}/>
                <span id="popup__elementName-error" className="popup__error"></span>
            </label>
            <label className="popup__label">
                <input className="popup__field popup__field_input_job" id="popup__link" name="link" type="url"
                       autoComplete="off"
                       placeholder="Ссылка на картинку" required onChange={(e) => setLink(e.target.value)} value={link || ''}/>
                <span id="popup__link-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    )
}
export default AddPlacePopup