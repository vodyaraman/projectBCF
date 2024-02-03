import React from "react";
import Authorisation from "./pages/authorisation-page/Authorisation";
import MainPage from "./pages/main-page/Main-page.js";
import "./localisation/i18n.js";
import i18n from "./localisation/i18n.js";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <div id="mainbody">
                    <Router>
                    <Routes>
                        <Route path="/" element={<Authorisation/>} />
                        <Route path="/mainpage" element={<MainPage/>} />
                    </Routes>
                    </Router>
                </div>
            </I18nextProvider>
        );
    }
}

export default App;