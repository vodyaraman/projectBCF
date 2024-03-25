import React from 'react';
import SBlock from '../structure-elements/SBlock-main';
import SBlockWrite from "../structure-elements/SBlock-write";
import { useTranslation } from "react-i18next";

const SBlockSection = ({fetchArticles, section, articles, isOpen }) => {
    const { t } = useTranslation();
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
                    <h1>{t("section")} "{t(section.section)}"</h1>
                    <button onClick={isOpen} className='sb-button section-button'>{t("back-to-sections")}</button>
                    <div className='section-navigation'>
                        {articles.map((article, index) => (
                            <ul
                                className="section-navigation"
                                key={index}
                                onClick={() => scrollToArticle(index)}>
                                - {article.title}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            {articles.map((article, index) => (
                <div className='block' id={`article-${index}`} key={index} name={article.title}>
                    <SBlock article={article} />
                </div>
            ))}
            <div className='block'>
                <SBlockWrite fetchArticles={fetchArticles} sectionid={section.id}/>
            </div>
        </>
    );
};

export default SBlockSection;