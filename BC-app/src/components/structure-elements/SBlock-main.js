import "../../pages/main-page/Main-page.css";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Calendar from "./SBlock-calendar.js";
import Author from "./SBlock-author.js";

const SBlock = ({ article }) => {
    const dateFromDatabase = article.time;
    const formattedDate = format(dateFromDatabase, "dd.MM.yyyy HH:mm");
    const { t } = useTranslation();

    const [user, setUser] = useState([]);
    const userid = article.userid;
    const [showCalendar, setShowCalendar] = useState(false);
    const [showAuthor, setShowAuthor] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [imageURL, setImageURL] = useState(""); // Состояние для URL изображения

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post("http://localhost:3001/getUserByID", {
                    userid: userid,
                });
                const { login } = response.data; // Теперь получаем только логин
                setUser(login); // Обновляем состояние с логином пользователя
            } catch (error) {
                console.error("Ошибка при загрузке пользователя", error);
            }
        };

        fetchUser();
    }, [userid]);

    useEffect(() => {
        const loadImage = async () => {
            try {
                // Предположим, что article.image содержит имя файла изображения
                const response = await axios.get(`http://localhost:3001/images/${article.filename}`, {
                    responseType: "blob", // Получаем изображение в виде blob
                });
                const imageURL = URL.createObjectURL(response.data); // Создаем URL для отображения изображения
                setImageURL(imageURL); // Обновляем состояние с URL изображения
            } catch (error) {
                console.error("Ошибка при загрузке изображения", error);
            }
        };

        loadImage();
    }, [article.filename]); // Обновляем изображение при изменении article.image

    const handleDateClick = () => {
        if (showCalendar) {
            setShowCalendar(false); // Если календарь уже открыт, закрываем его
        } else {
            setShowCalendar(true);
            setSelectedDate(formattedDate);
        }
    };

    const handleAuthorClick = () => {
        if (showAuthor) {
            setShowAuthor(false);
        } else {
            setShowAuthor(true);
        }
    };

    return (
        <div className={`structure-block ${showAuthor ? 'rounded' : ''}`}>
            <h1>{article.title}</h1>
            <pre className="structure-block-maintext">{article.article}</pre>
            {imageURL && <img src={imageURL} alt="Article" className="structure-block-maintext" />}
            <div className="structure-block-addtext">
                <div id="check-author" onClick={handleAuthorClick}>{t("author")} {user}</div>
                <div id="check-date" onClick={handleDateClick}>{t("date-publication")} {formattedDate}</div>
            </div>
            {showAuthor && <Author thisAuthor={user} />}
            {showCalendar && <Calendar selectedDate={selectedDate} onClose={() => setShowCalendar(false)} />}
        </div>
    );
};

export default SBlock;