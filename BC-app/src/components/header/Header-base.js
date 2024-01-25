import React from "react"
import ChangeTheme from "./ChangeTheme.js"
import "./header.css"

class HeaderBase extends React.Component {
    render(){
        return(
            <header>
                <div id="header-base">
                    <div id="function-header">
                        <ChangeTheme/>
                        <img src="..//images/sun.jpg" alt="Button 2" className="header-button"/>
                    </div>
                </div>
            </header>
        )
    }
}

export default HeaderBase