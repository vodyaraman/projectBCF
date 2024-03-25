import React from "react";
import "../../pages/main-page/Main-page.css";
import { useTranslation } from "react-i18next";

const SBlockEditor = ({ onSaveArticle, onClose, onDeleteArticle }) => {
    const { t } = useTranslation();
    const handleSaveClick = () => {
        onSaveArticle();
        onClose();
    };

    const handleDeleteClick = () => {
        onDeleteArticle();
        onClose();
    };

    return (
        <div className="structure-block-editor">
            <button className="structure-block-edit-button sb-button" onClick={handleSaveClick}>{t("save")}</button>
            <button className="structure-block-edit-button sb-button " onClick={handleDeleteClick}>{t("delete")}</button>
        </div>
    );
};

export default SBlockEditor;