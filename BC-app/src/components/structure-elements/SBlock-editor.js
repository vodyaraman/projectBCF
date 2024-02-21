import React from "react";
import "../../pages/main-page/Main-page.css";

const SBlockEditor = ({ onSaveArticle, onClose, onDeleteArticle }) => {

    const handleSaveClick = () => {
        onSaveArticle();
        onClose(); // Закрываем редактор после сохранения
    };

    const handleDeleteClick = () => {
        onDeleteArticle();
        onClose(); // Закрываем редактор после удаления
    };

    return (
        <div className="structure-block-editor">
            <button className="article-button" onClick={handleSaveClick}>Save</button>
            <button className="article-button" onClick={handleDeleteClick}>Delete</button>
        </div>
    );
};

export default SBlockEditor;