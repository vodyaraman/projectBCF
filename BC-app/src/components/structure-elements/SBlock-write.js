import React, { useState } from 'react';
import "../../pages/main-page/Main-page.css";
import axios from 'axios';
import xss from 'xss';

const SBlockWrite = ({ fetchArticles }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        if (!title || !content || !file) {
            alert("Title, content, and file cannot be empty");
            return;
        }

        try {
            const cleanedTitle = xss(title);
            const cleanedContent = xss(content);

            // Create FormData object to append file
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:3001/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('File successfully uploaded:', response.data); // Можно удалить, если не нужно
            const filename = response.data.filename; // Получаем имя файла из ответа сервера

            // Затем отправляем остальные данные на сервер для добавления статьи
            const articleResponse = await axios.post('http://localhost:3001/addArticle', {
                title: cleanedTitle,
                article: cleanedContent,
                userid: 2,
                file: filename // Передаем имя файла
            });

            console.log('Article successfully added:', articleResponse.data); // Можно удалить, если не нужно
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 4000);
            setTitle("");
            setContent("");
            setFile(null);
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
                placeholder='Enter title'
                value={title}
                onChange={handleTitleChange}
            />
            <textarea
                className="article-text-content"
                placeholder='Enter content'
                value={content}
                onChange={handleContentChange}
            />
            <input
                className="article-button"
                type="file"
                accept="image/*, audio/*"
                onChange={handleFileChange}
            />
            <button
                className="article-button"
                onClick={handleSubmit}>
                {isSubmitted ? <span>✓</span> : 'Submit'}
            </button>
        </div>
    );
};

export default SBlockWrite;