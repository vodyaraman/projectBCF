import React, { useState, memo, useEffect } from 'react';
import './Authorisation.css';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import HeaderBase from "../../components/header/Header-base";
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";
import AnimatedBackgroundDay from "../../components/background/light-theme-bg/day-bg";
import { useTranslation } from "react-i18next";
import AuthCheck from "../../database/check-auth-module";
import InputMask from "react-input-mask"

const MemoizedAnimatedBackgroundNight = memo(AnimatedBackgroundNight);
const MemoizedAnimatedBackgroundDay = memo(AnimatedBackgroundDay);

const Authorisation = () => {
    const { t } = useTranslation();

    const [code, setCode] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [backgroundTheme, setBackgroundTheme] = useState(getStoredBackgroundTheme() || 'day');
    const [error, setError] = useState(null);
    const [permission, setPermisson] = useState(false)

    const handleCodeChanged = (e) => {
        const inputCode = e.target.value;
        setCode(inputCode);
        const formattedCode = AuthCheck.check(inputCode);
        if (formattedCode) {
            setError("")
            setPermisson(true)
            console.log('Code:', code);
            console.log('Remember Me:', rememberMe);
        }
        else if (formattedCode === "") {
            setError("")
            setPermisson(false)
        }
        else if (formattedCode === null) {
            console.log(formattedCode)
            setError(t("error-message-auth")) //это можно упростить
            setPermisson(false)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (permission === true) {
            console.log("let's go")
        }
        else {
            console.log("go away")
        }
    };

    useEffect(() => {
        storeBackgroundTheme(backgroundTheme);
    }, [backgroundTheme]);

    const switchBackgroundTheme = (theme) => {
        setBackgroundTheme(theme);
    };


    return (
        <div id="authorisation-page">
            <HeaderBase switchBackgroundTheme={switchBackgroundTheme} />
            {backgroundTheme === 'night' ? <MemoizedAnimatedBackgroundNight /> : <MemoizedAnimatedBackgroundDay />}
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
                                value={code}
                                onChange={handleCodeChanged}
                            />
                        </label>
                        <div className="small-text">
                            {error && <span id="error-message">{error}</span>}
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
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
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
