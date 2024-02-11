import "../../pages/main-page/Main-page.css"
import React from 'react';

const SBlock = ({ article }) => {
    return (
        <div className="structure-block">
            <h1>{article.title}</h1>
            <span>{article.article}</span>
            <p>Автор: {article.userid}</p>
            <p>Дата публикации: {article.time}</p>
        </div>
    );
};

export default SBlock;