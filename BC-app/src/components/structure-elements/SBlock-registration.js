import React, { useState, useEffect } from 'react';
import "../../pages/main-page/Main-page.css"
import "../../pages/authorisation-page/Authorisation.css"
import { useTranslation } from "react-i18next";

const SBlockRegistration = ({ handleRegistration }) => {
    const { t } = useTranslation();
    const [backwards, setBackwards] = useState(false)
    const [state, setState] = useState({
        login: '',
        password: '',
        email: '',
        confirmPassword: '',
        permission: false,
        error: ''
    });

    useEffect(() => {
        const frontSide = document.querySelector('.afterwards');
        const backSide = document.querySelector('.backwards');
        if (backwards) {
            frontSide.style.transform = 'rotateX(180deg)';
            backSide.style.transform = 'rotateX(0deg)';
        }
        else {
            frontSide.style.transform = 'rotateX(0deg)';
            backSide.style.transform = 'rotateX(-180deg)';
        };
    }, [backwards])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
            permission: true,
        }));
    };

    const handleRegistrationClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            setBackwards(true)
        } else {
            setState((prevState) => ({
                ...prevState,
                error: t("error-message-password-mismatch"),
            }));
        }
    };

    const endRegistrationClick = (e) => {
        e.preventDefault();
        handleRegistration(state.login, state.password, state.permission, state.email);
    }

    const handleFuckGoBack = (e) => {
        e.preventDefault();
        setBackwards(!backwards);
    }

    return (
        <div className='authorisation-block'>
            <div className='roll afterwards'>
                <h2 className="auth-head-text">{t('registration-h1')}</h2>
                <form className="auth-main-form" onSubmit={handleRegistrationClick}>
                    <div className="auth-main-div">
                        <label htmlFor="login" className="form-label">
                            {t('enter-login')}
                            <input
                                type="text"
                                className='form-input'
                                name="login"
                                placeholder={t('placeholder-login')}
                                value={state.login}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label htmlFor="password" className="form-label">
                            {t('enter-password')}
                            <input
                                type="password"
                                className='form-input'
                                name="password"
                                placeholder={t('placeholder-password')}
                                value={state.password}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label htmlFor="confirmPassword" className="form-label">
                            {t('confirm-password')}
                            <input
                                type="password"
                                className='form-input'
                                name="confirmPassword"
                                placeholder={t('placeholder-confirm')}
                                value={state.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </label>
                        <div className="small-text">
                            {state.error && <span id="error-message">{state.error}</span>}
                        </div>
                    </div>
                    <button type="submit" className="submitButton">
                        {t('submit-btn')}
                    </button>
                </form>
            </div>
            <div className='roll backwards'>
                <h2 className='auth-head-text'>{t('registration-end')}</h2>
                <div className="auth-main-div">
                    <form className='auth-main-form'>
                        <label htmlFor="email" className="form-label">
                            {t('enter-email')}
                            <input
                                type="email"
                                className='form-input'
                                name="email"
                                placeholder={t('placeholder-email')}
                                value={state.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button 
                            className='submitButton' 
                            type='submit'
                            onClick={endRegistrationClick}
                            >{t('send-code-email')}</button>
                        <button className='submitButton' onClick={handleFuckGoBack}>{t("go-back")}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SBlockRegistration;