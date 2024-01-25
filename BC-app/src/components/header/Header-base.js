import React from "react"
import ChangeTheme from "./ChangeTheme.js"
import ChangeLanguage from "./ChangeLanguage.js"
import "./header.css"

class HeaderBase extends React.Component {
    render(){
        return(
            <header>
                <div id="function-header">
                    <div id="header-base">
                        <ChangeTheme/>
                        <ChangeLanguage/>
                    </div>
                </div>
            </header>
        )
    }
}

export default HeaderBase