import React from 'react';
import "../../pages/articles-page/Articles.css"
import { useTranslation } from "react-i18next";

const SBlockSections = ({ sections, handleOpenSection }) => {
    const { t } = useTranslation();
    return (
        <div className='block'>
            <div className='structure-block'>
                <h1>{t("sections")}</h1>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className="section"
                        onClick={() => handleOpenSection(section)}
                    >
                        <h2 className='structure-block-maintext section-text'>{t(section.section)}</h2>
                        <div className='structure-block-addtext section-text'>{t("articles-in-this-section")} {section.article_count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SBlockSections