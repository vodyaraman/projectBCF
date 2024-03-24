import React, { useState, useEffect, useContext, memo } from 'react';
import './Authorisation.css';
import SBlockAuthorisation from '../../components/structure-elements/SBlock-authorisation';
import SBlockRegistration from '../../components/structure-elements/SBlock-registration';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/UserContext';
import DatabaseClient from '../../httpRequests';

const Authorisation = memo(({ cancelAuth }) => {
    const { t } = useTranslation();
    const [isBackSide, setIsBackSide] = useState(false);
    const [changeButtonName, setChangeButtonName] = useState('registration-h1');
    const { handleSetUser } = useContext(AuthContext);
    const dbClient = new DatabaseClient();

    const handleAuthChange = () => {
        setIsBackSide(!isBackSide);
    };

    useEffect(() => {
        const frontSide = document.querySelector('.front');
        const backSide = document.querySelector('.back');
        if (isBackSide) {
            frontSide.style.transform = 'rotateY(180deg)';
            backSide.style.transform = 'rotateY(0deg)';
            setChangeButtonName("login-h1");
        } else {
            frontSide.style.transform = 'rotateY(0deg)';
            backSide.style.transform = 'rotateY(-180deg)';
            setChangeButtonName("registration-h1");
        }
    }, [isBackSide]);

    const handleLogin = async (code, permission) => {
        if (permission) {
            try {
                const user = await dbClient.submitData(code);
                handleSetUser(user);
                cancelAuth();
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        } else {
            console.log("Permission denied");
        }
    };

    const handleRegistration = async (login, password, permission, email) => {
        if (permission) {
            try {
                await dbClient.addUser(login, password, email);
                setIsBackSide(false);
                alert("Письмо с кодом авторизации выслано на элетронную почту");
            } catch (error) {
                console.error('Error adding user:', error);
            }
        } else {
            console.log('Permission denied');
        }
    };

    return (
        <div className="authorisation-page">
            <div className='container'>
                <div className='handleAuth'>
                    <button className='changeAuth' onClick={handleAuthChange}>{t(changeButtonName)}</button>
                    <button className='changeAuth auth-cancel' onClick={cancelAuth}> X </button>
                </div>
                <div className='side front'>
                    <SBlockAuthorisation handleLogin={handleLogin} handleAuthChange={handleAuthChange} />
                </div>
                <div className='side back'>
                    <SBlockRegistration handleRegistration={handleRegistration} />
                </div>
            </div>
        </div>
    );
});

export default Authorisation;

