import React, { useState, useEffect } from 'react';
import './Authorisation.css';
import AnimatedBackground from '../../components/background/AnimatedBackground';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SettingsWindow from '../../components/structure-elements/SBlock-settings';
import SBlockAuthorisation from '../../components/structure-elements/SBlock-authorisation';
import SBlockRegistration from '../../components/structure-elements/SBlock-registration';
import { useTranslation } from 'react-i18next';

const HOST = "192.168.43.134";
const PORT = 3001;

const Authorisation = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isBackSide, setIsBackSide] = useState(false)
    const [changeButtonName, setChangeButtonName] = useState('registration-h1')

    const handleAuthChange = () => {
        setIsBackSide(!isBackSide)
    }

    useEffect(() => {
        const frontSide = document.querySelector('.front');
        const backSide = document.querySelector('.back');
        if (isBackSide) {
            frontSide.style.transform = 'rotateY(180deg)';
            backSide.style.transform = 'rotateY(0deg)';
            setChangeButtonName("login-h1")
        }
        else {
            frontSide.style.transform = 'rotateY(0deg)';
            backSide.style.transform = 'rotateY(-180deg)';
            setChangeButtonName("registration-h1")
        };
    }, [isBackSide])

    const handleLogin = async (code, permission) => {
        if (permission) {
            try {
                const response = await axios.post(`http://${HOST}:${PORT}/users/submitData`, {
                    code: code
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

    const handleRegistration = async (login, password, permission, email) => {
        if (permission) {
            try {
                const response = await axios.post(`http://${HOST}:${PORT}/users/addUser`, {
                    login: login,
                    password: password,
                    email: email
                })
                console.log(response.data)
                window.location.reload();
            }

            catch (error) {
                console.error('Error adding user', error)
            }
        }
        else {
            console.log('permission denied')
        }
    }

    return (
        <div className="authorisation-page">
            <AnimatedBackground />
            <SettingsWindow />
            <button className='changeAuth' onClick={handleAuthChange}>{t(changeButtonName)}</button>
            <div className='container'>
                <div className='side front'>
                    <SBlockAuthorisation handleLogin={handleLogin} handleAuthChange={handleAuthChange} />
                </div>
                <div className='side back'>
                    <SBlockRegistration handleRegistration={handleRegistration} />
                </div>
            </div>
        </div>
    );
};


export default Authorisation;

