import React, { useState } from 'react';
import "../../pages/main-page/Main-page.css"
import "../../pages/authorisation-page/Authorisation.css"
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";
import AuthCheck from "../../pages/authorisation-page/check-auth-module";

const SBlockAuthorisation = ({ handleLogin, handleAuthChange }) => {
    const { t } = useTranslation();
    const [state, setState] = useState({
        code: '',
        rememberMe: false,
        permission: false,
        error: ''
    });

    const handleCodeChanged = (e) => {
        const inputCode = e.target.value;
        setState((prevState) => ({
            ...prevState,
            code: inputCode,
            permission: false,
        }));

        const formattedCode = AuthCheck.check(inputCode);

        if (formattedCode) {
            setState((prevState) => ({
                ...prevState,
                permission: true,
                error: ""
            }));
        } else if (formattedCode === "") {
            setState((prevState) => ({ ...prevState, error: "" }));
        } else if (formattedCode === null) {
            setState((prevState) => ({
                ...prevState,
                error: t("error-message-auth"),
                permission: false,
            }));
        }
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        handleLogin(state.code, state.permission)
    }

    const handleNoCodeClick =() => {
        handleAuthChange();
    }

    return (
        <div className='authorisation-block'>
            <h2 className="auth-head-text">{t('login-h1')}</h2>
            <form className="auth-main-form" onSubmit={handleLoginClick}>
                <div className="auth-main-div">
                    <label htmlFor="code" className="form-label">
                        {t('enter-code')}
                        <InputMask
                            mask="999-999-999"
                            maskChar="X"
                            type="text"
                            className='form-input'
                            placeholder={t("placeholder-code")}
                            value={state.code}
                            onChange={handleCodeChanged}
                        />
                    </label>
                    <div className="small-text">
                        {state.error && <span id="error-message">{state.error}</span>}
                        <div className="textlink" onClick={handleNoCodeClick}>{t("no-code")}</div>
                    </div>
                </div>
                <button type="submit" className="submitButton">
                    {t('submit-btn')}
                </button>
                <div className="small-text">
                    <label htmlFor="checkbox-main" id="checkbox-label">
                        {t('remember-me')}
                        <input
                            type="checkbox"
                            id="checkbox-main"
                            checked={state.rememberMe}
                            onChange={() =>
                                setState((prevState) => ({
                                    ...prevState,
                                    rememberMe: !prevState.rememberMe,
                                }))
                            }
                        />
                    </label>
                </div>
            </form>
        </div>
    );
}

export default SBlockAuthorisation;