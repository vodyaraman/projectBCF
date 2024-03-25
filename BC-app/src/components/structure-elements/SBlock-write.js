import React, { useContext, useState } from 'react';
import "../../pages/main-page/Main-page.css";
import axios from 'axios';
import xss from 'xss';
import { AuthContext } from '../../contexts/UserContext';
import { useTranslation } from "react-i18next";

const HOST = "192.168.43.134";
const PORT = 3001;

const SBlockWrite = ({ fetchArticles, isMain, sectionid }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { user } = useContext(AuthContext)
    const { t } = useTranslation();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("Title and content cannot be empty");
            return;
        }
        try {
            const cleanedTitle = xss(title);
            const cleanedContent = xss(content);
            var filename;

            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(`http://${HOST}:${PORT}/files/uploadFile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('File successfully uploaded:', response.data);
                filename = response.data.filename;
            }

            const articleResponse = await axios.post(`http://${HOST}:${PORT}/articles/addArticle`, {
                title: cleanedTitle,
                article: cleanedContent,
                userid: user.accid,
                file: filename,
                isMain: isMain,
                sectionid: sectionid
            });

            console.log('Article successfully added:', articleResponse.data);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 4000);
            setTitle("");
            setContent("");
            setFile("");
            fetchArticles();
            setTimeout(() => {
                document.getElementById("page-scrollbar-container").scrollTop =
                    document.getElementById("page-scrollbar-container").scrollHeight;
            }, 100);

        } catch (error) {
            console.error('Error adding article:', error);
        }
    };

    return (
        <div className='structure-block'>
            <input
                className="article-text-title"
                type='text'
                placeholder={t('enter-title')}
                value={title}
                onChange={handleTitleChange}
            />
            <textarea
                className="article-text-content"
                placeholder={t('enter-content')}
                value={content}
                onChange={handleContentChange}
            />
            <label className='article-add-image-button'>
                <input
                    type="file"
                    name='file'
                    accept="image/*, audio/*"
                    onChange={handleFileChange}
                />
                <span className="sb-button article-button">{file ? file.name : t("choose-file")}</span>
            </label>
            <button
                className="article-button sb-button"
                onClick={handleSubmit}>
                {isSubmitted ? <span>✓</span> : t("submit-btn")}
            </button>
        </div>
    );
};

export default SBlockWrite;