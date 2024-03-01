import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Calendar from "./SBlock-calendar.js";
import Editor from "./SBlock-editor.js";
import "../../pages/main-page/Main-page.css";

const HOST = "192.168.43.134";
const PORT = 3001;

const SBlock = ({ article, fetchArticles }) => {
    const dateFromDatabase = article.time;
    const title = article.title;

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
        if (isEditing) {
            const block = document.getElementsByName(title)[0];
            block.scrollIntoView({block: "center"
            });
        }
    }, [isEditing, title])
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post(`http://${HOST}:${PORT}/users/getUserByID`, {
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
            if (article.filename) {
                try {
                    const response = await axios.get(`http://${HOST}:${PORT}/files/images/${article.filename}`, {
                        responseType: "blob",
                    });
                    const imageURL = URL.createObjectURL(response.data);
                    setImageURL(imageURL);
                } catch (error) {
                    console.error("Ошибка при загрузке изображения", error);
                }
            }
        };

        loadImage();
    }, [article.filename]);

    const handleDateClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleAuthorClick = () => {
        setIsEditing(!isEditing);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    const handleSaveArticle = async () => {
        try {
            const response = await axios.put(`http://${HOST}:${PORT}/articles/updateArticle/${article.id}`, {
                title: editedTitle,
                content: editedContent,
            });
            setIsEditing(false);
            fetchArticles();
        } catch (error) {
            console.error("Error updating article:", error);
        }
    };

    const handleDeleteArticle = async () => {
        if (window.confirm("Вы удаляете статью?")) {
            try {
                const response = await axios.delete(`http://${HOST}:${PORT}/articles/deleteArticle/${article.id}`);
                fetchArticles();
            } catch (error) {
                console.error("Error deleting article:", error);
            }
        }
    };

    return (
        <div className={`structure-block ${isEditing ? 'rounded' : ''}`}>
            {isEditing ? (
                <div>
                    <input className="structure-block-editable-title" type="text" value={editedTitle} onChange={handleTitleChange} />
                    <textarea className="structure-block-editable-content" value={editedContent} onChange={handleContentChange} />
                    {imageURL &&
                        <div className="structure-block-edit-image">
                            <img src={imageURL} alt="Article" className="structure-block-editable-content" />
                        </div>}
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

