import React from "react"
import Authorisation from "./pages/authorisation-page/Authorisation"
import "./localisation/i18n.js"
import i18n from "./localisation/i18n.js";
import { I18nextProvider } from "react-i18next";

class App extends React.Component {
    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <div id="mainbody">
                    <Authorisation />
                </div>
            </I18nextProvider>)
    }
}
export default App;