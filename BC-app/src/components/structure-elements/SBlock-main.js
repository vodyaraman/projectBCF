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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post("http://localhost:3001/getUserByID", {
                    userid: userid,
                });
                const { user } = response.data;
                setUser(user);
            } catch (error) {
                console.error("Ошибка при загрузке пользователя", error);
            }
        };

        fetchUser();
    }, [userid]);

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
    }

    return (
        <div className={`structure-block ${showAuthor ? 'rounded' : ''}`}>
            <h1>{article.title}</h1>
            <p className="structure-block-maintext">{article.article}</p>
            <div className="structure-block-addtext">
                <div id="check-author" onClick={handleAuthorClick}>{t("author")} {user.login}</div>
                <div id="check-date" onClick={handleDateClick}>{t("date-publication")} {formattedDate}</div>
            </div>
            {showAuthor && <Author thisAuthor={user}/>}
            {showCalendar && <Calendar selectedDate={selectedDate} onClose={() => setShowCalendar(false)} />}
        </div>
    );
};

export default SBlock;