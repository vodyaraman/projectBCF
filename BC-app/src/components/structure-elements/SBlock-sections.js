import React from 'react';
import "../../pages/articles-page/Articles.css"

const SBlockSections = ({ sections, handleOpenSection }) => {
    return (
        <div className='block'>
            <div className='structure-block'>
                <h1>Sections</h1>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className="section"
                        onClick={() => handleOpenSection(section)}
                    >
                        <div className='structure-block-maintext section-text'>{section.section}</div>
                        <div className='structure-block-addtext section-text'>Atricles in this section: {section.article_count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SBlockSections