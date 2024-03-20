import React from "react";
import Authorisation from "./pages/authorisation-page/Authorisation";
import MainPage from "./pages/main-page/Main-page.js";
import AboutPage from "./pages/about-page/About.js";
import ReviewsPage from "./pages/reviews-page/Reviews.js";
import ArticlesPage from "./pages/articles-page/Articles.js";
import "./localisation/i18n.js";
import i18n from "./localisation/i18n.js";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/UserContext.js";
import 'react-tooltip/dist/react-tooltip.css'
import AnimatedBackground from "./components/background/AnimatedBackground.js";

class App extends React.Component {
    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <AuthProvider>
                        <div id="mainbody">
                            <AnimatedBackground/>
                            <Router>
                                <Routes>
                                    <Route path="/user" element={<Authorisation />} />
                                    <Route path="/" element={<MainPage />} />
                                    <Route path="/articles" element={<ArticlesPage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/reviews" element={<ReviewsPage />} />
                                </Routes>
                            </Router>
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </I18nextProvider>
        );
    }
}

export default App;