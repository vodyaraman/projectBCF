import "../../pages/main-page/Main-page.css"
import React from 'react';
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import axios from "axios";

const SBlock = ({ article }) => {
    const dateFromDatabase = article.time;
    const formattedDate = format(dateFromDatabase, "dd.MM.yyyy HH:mm");

    const [user, setUser] = useState([]);
    const userid = article.userid
    console.log(userid)

    useEffect(() => {     
        const fetchUser = async () => {
            try {
                const response = await axios.post('http://localhost:3001/getUserByID', {
                    userid: userid
                })
                const {user} = response.data;
                setUser(user);
                console.log(user)   
            } catch (error) {
                console.error('Ошибка при загрузке пользователя', error);
            }
        };

        fetchUser();
    }, [userid]);

    return (
        <div className="structure-block">
            <h1>{article.title}</h1>
            <p className="structure-block-maintext">{article.article}</p>
            <div className="structure-block-addtext">
                <span>Автор: {user.login}</span>
                <span>Дата публикации: {formattedDate} </span>
            </div>
        </div>
    );
};

export default SBlock;