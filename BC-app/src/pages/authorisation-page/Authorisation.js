import React, { useState, memo, useEffect } from 'react';
import './Authorisation.css';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import HeaderBase from "../../components/header/Header-base";
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";
import AnimatedBackgroundDay from "../../components/background/light-theme-bg/day-bg";
import { useTranslation } from "react-i18next";
import i18n from '../../localisation/i18n';

const MemoizedAnimatedBackgroundNight = memo(AnimatedBackgroundNight);
const MemoizedAnimatedBackgroundDay = memo(AnimatedBackgroundDay);

const Authorisation = () => {
    const { t } = useTranslation();
    console.log("Language:", i18n.language);

    const [code, setCode] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [backgroundTheme, setBackgroundTheme] = useState(getStoredBackgroundTheme() || 'day');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Code:', code);
        console.log('Remember Me:', rememberMe);
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
                            <input
                                type="text"
                                id="code"
                                placeholder='This_is@my.code'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </label>
                        <div className="small-text">
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
