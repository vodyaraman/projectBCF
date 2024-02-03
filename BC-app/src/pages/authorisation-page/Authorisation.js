import React, { useState, memo, useEffect } from 'react';
import './Authorisation.css';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import HeaderBase from "../../components/header/Header-base";
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";
import AnimatedBackgroundDay from "../../components/background/light-theme-bg/day-bg";
import { useTranslation } from "react-i18next";
import AuthCheck from "./check-auth-module";
import InputMask from "react-input-mask";
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const MemoizedAnimatedBackgroundNight = memo(AnimatedBackgroundNight);
const MemoizedAnimatedBackgroundDay = memo(AnimatedBackgroundDay);

const Authorisation = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        code: '',
        rememberMe: false,
        backgroundTheme: getStoredBackgroundTheme() || 'day',
        error: null,
        permission: false,
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
                error: null,
                permission: true,
            }));
        } else if (formattedCode === "") {
            setState((prevState) => ({ ...prevState, error: null }));
        } else if (formattedCode === null) {
            setState((prevState) => ({
                ...prevState,
                error: t("error-message-auth"),
                permission: false,
            }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (state.permission) {
            try {
                const response = await axios.post('http://localhost:3001/submitData', {
                    code: state.code
                });
                console.log(response.data);

                if (response.data.exists) {
                    navigate("/mainpage");
                }
            } catch (error) {
                console.error('Error submitting data', error);
            }
        } else {
            console.log("Permission denied");
        }
    };

    useEffect(() => {
        storeBackgroundTheme(state.backgroundTheme);
    }, [state.backgroundTheme]);

    const switchBackgroundTheme = (theme) => {
        setState((prevState) => ({ ...prevState, backgroundTheme: theme }));
    };

    return (
        <div id="authorisation-page">
            <HeaderBase switchBackgroundTheme={switchBackgroundTheme} />
            {state.backgroundTheme === 'night' ? (
                <MemoizedAnimatedBackgroundNight />
            ) : (
                <MemoizedAnimatedBackgroundDay />
            )}
            <div className="authorisation-window">
                <h2 id="auth-head-text">{t('login-h1')}</h2>
                <form id="auth-main-form" onSubmit={handleLogin}>
                    <div id="auth-main-div">
                        <label htmlFor="code" id="code-label">
                            {t('enter-code')}
                            <InputMask
                                mask="999-999-999"
                                maskChar="X"
                                type="text"
                                id="code"
                                placeholder={t("placeholder-code")}
                                value={state.code}
                                onChange={handleCodeChanged}
                            />
                        </label>
                        <div className="small-text">
                            {state.error && <span id="error-message">{state.error}</span>}
                            <a href="https://vk.com/rp.vodyaraman">{t("no-code")}</a>
                        </div>
                    </div>
                    <button type="submit" id="submitButton">
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
        </div>
    );
};

const storeBackgroundTheme = (theme) => {
    localStorage.setItem('backgroundTheme', theme);
};

const getStoredBackgroundTheme = () => {
    return localStorage.getItem('backgroundTheme');
};

export default Authorisation;

