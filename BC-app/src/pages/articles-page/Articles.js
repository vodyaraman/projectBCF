import React, { useEffect, useMemo, useState } from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./Articles.css";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import SBlockSections from '../../components/structure-elements/SBlock-sections.js';
import SBlockSection from '../../components/structure-elements/SBlock-section.js';
import DatabaseClient from '../../httpRequests.js';

const ArticlesPage = () => {
    const [sections, setSections] = useState([]);
    const [articles, setArticles] = useState([]);
    const dbClient = useMemo(() => { return new DatabaseClient() }, []);
    const [isOpen, setIsOpen] = useState(true);
    const [thisSection, setThisSection] = useState(null)

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await dbClient.getAllSections();
                setSections(response);
            } catch (error) {
                console.error("Error fetching sections", error);
                throw (error);
            }
        }
        fetchSections();
    }, [dbClient]);

    const fetchArticles = async (idSection) => {
        try {
            const response = await dbClient.getArticlesBySection(idSection);
            setArticles(response)
        } catch (error) {
            console.error("Error fetching articles", error);
            throw (error);
        }
    }

    const handleOpenSection = (section) => {
        setIsOpen(!isOpen)
        fetchArticles(section.id)
        setThisSection(section)
    }

    return (
        <div id='articles-page'>
            <div id='page-scrollbar-container'>
                <Header />
                {isOpen ? (
                    <SBlockSections sections={sections} handleOpenSection={handleOpenSection} />
                ) : (
                    <SBlockSection fetchArticles={fetchArticles} articles={articles} section={thisSection} isOpen={setIsOpen} />
                )}
                <Footer />
            </div>
        </div>
    );
}

export default ArticlesPage;