import React from 'react';
import SBlock from '../structure-elements/SBlock-main';
import SBlockWrite from "../structure-elements/SBlock-write";

const SBlockSection = ({ section, articles, isOpen }) => {
    const scrollToArticle = (index) => {
        const articleElement = document.getElementById(`article-${index}`);
        if (articleElement) {
            articleElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <div className='block'>
                <div className='structure-block'>
                    <h1>{section.section}</h1>
                    <button onClick={isOpen} className='article-button section-button'>Back to sections</button>
                    <ul className='section-navigation'>
                        {articles.map((article, index) => (
                            <li
                                className="section-navigation section-text"
                                key={index}
                                onClick={() => scrollToArticle(index)}>
                                {article.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {articles.map((article, index) => (
                <div className='block' id={`article-${index}`} key={index}>
                    <SBlock article={article} />
                </div>
            ))}
            <div className='block'>
                <SBlockWrite />
            </div>
        </>
    );
};

export default SBlockSection;