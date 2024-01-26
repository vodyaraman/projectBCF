import React, { useState, memo, useEffect } from 'react';
import './Authorisation.css';
import "../../components/header/header.css";
import HeaderBase from "../../components/header/Header-base";
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";
import AnimatedBackgroundDay from "../../components/background/light-theme-bg/day-bg";
import ChangeThemeWindow from "../../components/header/ChangeTheme";

const MemoizedAnimatedBackgroundNight = memo(AnimatedBackgroundNight);
const MemoizedAnimatedBackgroundDay = memo(AnimatedBackgroundDay);

const Authorisation = () => {
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
                <h2 id="auth-head-text">Log in</h2>
                <form id="auth-main-form" onSubmit={handleLogin}>
                    <div id="auth-main-div">
                        <label htmlFor="code" id="code-label">
                            Enter an authorization code:
                            <input
                                type="text"
                                id="code"
                                placeholder="This_is@my.code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </label>
                        <div className="small-text">
                            <a href="https://vk.com/rp.vodyaraman">don't have the code?</a>
                        </div>
                    </div>
                    <button type="submit" id="submitButton">
                        submit
                    </button>
                    <div className="small-text">
                        <label htmlFor="checkbox-main" id="checkbox-label">
                            remember me, please
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
