import React, { useState } from 'react';
import "../../pages/main-page/Main-page.css";
import axios from 'axios';
import xss from 'xss';

const SBlockWrite = ({fetchArticles}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("Заголовок и статья не могут быть пустыми")
            return;
        }

        try {
            const cleanedTitle = xss(title);
            const cleanedContent = xss(content);

            const response = await axios.post('http://localhost:3001/addArticle', {
                title: cleanedTitle,
                article: cleanedContent,
                userid: 2
            });

            console.log('Article successfully added:', response.data);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 4000); // Устанавливаем таймер для сброса состояния isSubmitted через 4 секунды

            setTitle("");
            setContent("");
            fetchArticles();
            setTimeout(() =>
            document.getElementById("page-scrollbar-container").scrollTop =
            document.getElementById("page-scrollbar-container").scrollHeight, 100)

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
                onClick={handleSubmit}>
                {isSubmitted ? <span>✓</span> : 'Submit'} {/* Отображаем галочку или текст в зависимости от состояния */}
            </button>
        </div>
    );
};

export default SBlockWrite;