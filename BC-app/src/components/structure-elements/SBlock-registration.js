import React, { useState } from 'react';
import "../../pages/main-page/Main-page.css"
import "../../pages/authorisation-page/Authorisation.css"
import { useTranslation } from "react-i18next";

const SBlockRegistration = ({ handleRegistration }) => {
    const { t } = useTranslation();
    const [state, setState] = useState({
        login: '',
        password: '',
        confirmPassword: '',
        permission: false,
        error: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
            permission: false,
        }));
    };

    const handleRegistrationClick = (e) => {
        e.preventDefault();
        // Add validation logic for password matching
        if (state.password === state.confirmPassword) {
            handleRegistration(state.login, state.password);
        } else {
            setState((prevState) => ({
                ...prevState,
                error: t("error-message-password-mismatch"),
            }));
        }
    };

    return (
        <div className='authorisation-block'>
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
    );
}

export default SBlockRegistration;