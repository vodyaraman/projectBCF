import React, { useState } from 'react';
import './Authorisation.css';
import AnimatedBackground from '../../components/background/AnimatedBackground';
import AuthCheck from "./check-auth-module";
import InputMask from "react-input-mask";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsWindow from '../../components/structure-elements/SBlock-settings';

const HOST = "192.168.43.134";
const PORT = 3001;

const Authorisation = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        code: '',
        rememberMe: false,
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
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (state.permission) {
            try {
                const response = await axios.post(`http://${HOST}:${PORT}/submitData`, {
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

    return (
        <div id="authorisation-page">
            <AnimatedBackground />
            <SettingsWindow />
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

export default Authorisation;

