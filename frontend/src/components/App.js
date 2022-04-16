import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { register, login, checkToken } from '../utils/Auth';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const history = useHistory();
    useEffect(() => {
        api.getProfile()
            .then((data) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [loggedIn])
    useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data.cards);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [loggedIn])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const updateCardsList = cards.filter((c) => c._id !== card._id)
                setCards(updateCardsList);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsInfoTooltipOpen(false)
        setSelectedCard({})
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleUpdateUser(user) {
        setIsLoading(true)
        api.setUserInfo(user)
            .then((user) => {
                setCurrentUser(user)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(avatar) {
        setIsLoading(true)
        api.changeAvatar(avatar)
            .then((avatar) => {
                setCurrentUser(avatar)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true)
        api.setCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }
    function handleRegistration(email, password) {
        register(email, password)
            .then(() => {
                setIsSuccess(true);
                setIsInfoTooltipOpen(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(err);
                setIsSuccess(false);
                setIsInfoTooltipOpen(true);
            })
    }

    function handleAuthorization(email, password) {
        login(email, password)
            .then((data) => {
                if (email) {
                    setUserEmail(email)
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            checkToken(jwt)
                .then((res) => {
                    setUserEmail(res.email);
                    setLoggedIn(true);
                    history.push('/');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [history])
    function handleSignOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
        setLoggedIn(false);
        setUserEmail('');
    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root__wrapper">
                <Header
                    email={userEmail}
                    loggedIn={loggedIn}
                    handleSignOut={handleSignOut}
                />
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Route exact path="/sign-up">
                        <Register onAuthorization={handleRegistration} />
                    </Route>
                    <Route exact path="/sign-in">
                        <Login onLogin={handleAuthorization} />
                    </Route>
                    <Route path="/">
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>
                </Switch>
                <Footer />
            </div>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                isLoading={isLoading} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}
                isLoading={isLoading} />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                isSuccess={isSuccess}
            />

        </CurrentUserContext.Provider>
    );
}

export default App;
