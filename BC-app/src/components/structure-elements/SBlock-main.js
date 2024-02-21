import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Calendar from "./SBlock-calendar.js";
import Editor from "./SBlock-editor.js";
import "../../pages/main-page/Main-page.css";

const SBlock = ({ article }) => {
    const dateFromDatabase = article.time;
    const formattedDate = format(dateFromDatabase, "dd.MM.yyyy HH:mm");
    const { t } = useTranslation();

    const [user, setUser] = useState([]);
    const userid = article.userid;
    const [imageURL, setImageURL] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [editedTitle, setEditedTitle] = useState(article.title);
    const [editedContent, setEditedContent] = useState(article.article);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post("http://localhost:3001/getUserByID", {
                    userid: userid,
                });
                const { login } = response.data;
                setUser(login);
            } catch (error) {
                console.error("Ошибка при загрузке пользователя", error);
            }
        };

        fetchUser();
    }, [userid]);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/images/${article.filename}`, {
                    responseType: "blob",
                });
                const imageURL = URL.createObjectURL(response.data);
                setImageURL(imageURL);
            } catch (error) {
                console.error("Ошибка при загрузке изображения", error);
            }
        };

        loadImage();
    }, [article.filename]);

    const handleDateClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleAuthorClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    const handleSaveArticle = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/updateArticle/${article.id}`, {
                title: editedTitle,
                content: editedContent,
            });
            console.log(response)
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating article:", error);
            // Handle error updating article
        }
    };

    const handleDeleteArticle = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteArticle/${article.id}`);
            console.log(response)
        } catch (error) {
            console.error("Error deleting article:", error);
            // Handle error deleting article
        }
    };

    return (
        <div className={`structure-block ${isEditing ? 'rounded' : ''}`}>
            {isEditing ? (
                <div>
                    <input className="article-text-title" type="text" value={editedTitle} onChange={handleTitleChange} />
                    <textarea className="article-text-content" value={editedContent} onChange={handleContentChange} />
                    <Editor
                        onSaveArticle={handleSaveArticle}
                        onDeleteArticle={handleDeleteArticle}
                        onClose={() => setIsEditing(false)}
                    />
                </div>
            ) : (
                <div>
                    <h1>{article.title}</h1>
                    <pre className="structure-block-maintext">{article.article}</pre>
                    {imageURL && <img src={imageURL} alt="Article" className="structure-block-maintext" />}
                </div>
            )}

            <div className="structure-block-addtext">
                <div id="check-author" onClick={handleAuthorClick}>{t("author")} {user}</div>
                <div id="check-date" onClick={handleDateClick}>{t("date-publication")} {formattedDate}</div>
            </div>
            {showCalendar && <Calendar selectedDate={formattedDate} onClose={() => setShowCalendar(false)} />}
        </div>
    );
};

export default SBlock;

