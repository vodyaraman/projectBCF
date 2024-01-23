import React, { useState, memo } from 'react';
import './Authorisation.css';
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";

// Оберните компонент AnimatedBackgroundNight в React.memo
const MemoizedAnimatedBackgroundNight = memo(AnimatedBackgroundNight);

const Authorisation = () => {
    const [code, setCode] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Ваша логика входа, например, отправка данных на сервер
        console.log('Code:', code);
        console.log('Remember Me:', rememberMe);
    };

    return (
        <div id="authorisation-page">
            {/* Используйте MemoizedAnimatedBackgroundNight вместо AnimatedBackgroundNight */}
            <MemoizedAnimatedBackgroundNight />
            <div className="authorisation-window">
                <h2 id="auth-head-text">Login</h2>
                <form id="auth-main-form" onSubmit={handleLogin}>
                    <div id="auth-main-div">
                        <label htmlFor="code" id="code-label">
                            Enter an authorization code:
                            <input type="text" id="code" placeholder="This_is@my.code" value={code} onChange={(e) => setCode(e.target.value)} />
                        </label>
                        <div className="small-text">
                            <a href="https://vk.com/rp.vodyaraman">don't have the code?</a>
                        </div>
                    </div>
                    <button type="submit" id="submitButton">Enter</button>
                    <div className="small-text">
                        <label htmlFor="checkbox-main" id="checkbox-label">
                            remember me, please
                            <input type="checkbox" id="checkbox-main" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Authorisation;
