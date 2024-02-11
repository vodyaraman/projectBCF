import React, { useState } from 'react';
import "../../pages/main-page/Main-page.css";
import axios from 'axios'; // Импортируем axios для выполнения HTTP запросов

const SBlockWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Выполняем POST запрос на сервер, передавая данные о статье
            const response = await axios.post('http://localhost:3001/addArticle', {
                title: title,
                article: content,
                userid: 2 // Замените на реальный идентификатор пользователя
            });

            console.log('Article successfully added:', response.data);
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
            <button
                className="article-button"
                onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default SBlockWrite;