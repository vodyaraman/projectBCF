import React from "react"
import "./header.css"

class HeaderBase extends React.Component {
    render(){
        return(
            <header>
                <div id="header-base">
                    <div id="header-change-buttons">
                        <img src="..//images/moon.jpg" alt="Button 1" className="header-button" />   
                        <img src="..//images/sun.jpg" alt="Button 2" className="header-button" />
                    </div>
                </div>
            </header>
        )
    }
}

export default HeaderBase