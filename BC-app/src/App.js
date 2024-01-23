import React from "react"
import Authorisation from "./pages/authorisation-page/Authorisation"

class App extends React.Component{
    render() {
        return (
            <body>
                <div id="mainbody">
                    <Authorisation/>
                </div> 
            </body>
        )
    }
}
export default App;