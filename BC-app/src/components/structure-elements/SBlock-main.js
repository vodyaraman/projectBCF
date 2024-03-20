import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import DatabaseClient from "../../httpRequests.js";
import Editor from "./SBlock-editor.js";
import "../../pages/main-page/Main-page.css";


const SBlock = ({ article, fetchArticles }) => {
    const dateFromDatabase = article.time;
    const title = article.title;

    const formattedDate = format(dateFromDatabase, "dd.MM.yyyy HH:mm");
    const { t } = useTranslation();
    const [author, setAuthor] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(article.title);
    const [editedContent, setEditedContent] = useState(article.article);
    const dbClient = new DatabaseClient();

    useEffect(() => {
        if (isEditing) {
            const block = document.getElementsByName(title)[0];
            block.scrollIntoView({ block: "center" });
        }
    }, [isEditing, title]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await dbClient.getUserByID(article.userid);
                setAuthor(user);

                if (article.filename) {
                    const imageURL = await dbClient.getImage(article.filename);
                    setImageURL(imageURL);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [article.userid, article.filename]);

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
            await dbClient.updateArticle(article.id, editedTitle, editedContent);
            setIsEditing(false);
            fetchArticles();
        } catch (error) {
            console.error("Error updating article:", error);
        }
    };

    const handleDeleteArticle = async () => {
        if (window.confirm("Вы удаляете статью?")) {
            try {
                await dbClient.deleteArticle(article.id);
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
                    {imageURL && <img src={imageURL} alt="Article" className="structure-block-maintext picture" />}
                </div>
            )}
            <div className="structure-block-addtext">
                <div id="check-author" onClick={handleAuthorClick}>{t("author")} {author}</div>
                <div id="check-date">{t("date-publication")} {formattedDate}</div>
            </div>
        </div>
    );
};

export default SBlock;

