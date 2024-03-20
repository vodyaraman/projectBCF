import React, { useState, useEffect } from 'react';
import "../../pages/articles-page/Articles.css"
import DatabaseClient from '../../httpRequests';
import SBlock from '../structure-elements/SBlock-main';

const SBlockSections = () => {
    const [sections, setSections] = useState([]);
    const [articles, setArticles] = useState([]);
    const dbClient = new DatabaseClient();
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await dbClient.getAllSections();
                setSections(response);
            } catch (error) {
                console.error("Error fetching sections", error);
                throw (error);
            }
            console.error("fetching")
        }
        fetchSections()
    }, []);

    const fetchArticles = async (idSection) => {
        try {
            const response = await dbClient.getArticlesBySection(idSection);
            setArticles(response)
        } catch (error) {
            console.error("Error fetching articles", error);
            throw (error);
        }
    }

    const handleOpenSection = (id) => {
        setIsOpen(!isOpen)
        fetchArticles(id)
    }

    return (
        <>
            {isOpen ? (
                <div className='block'>
                    <div className='structure-block'>
                        <h1>Sections</h1>
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="section"
                                onClick={() => handleOpenSection(section.id)}
                            >
                                <div className='structure-block-maintext section-text'>{section.section}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className='block'>
                        <div className='structure-block'>
                            <h1>Articles in this section</h1>
                        </div>
                    </div>
                    {articles.map((article, index) => (
                        <div className='block'>
                            <SBlock key={index} article={article} fetchArticles={fetchArticles} />
                        </div>
                    ))}
                </>
            )
            }
        </>
    );
}

export default SBlockSections;