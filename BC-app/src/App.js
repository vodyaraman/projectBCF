import React from "react"
import Authorisation from "./pages/authorisation-page/Authorisation"
import HeaderBase from "./components/header/Header-base"

class App extends React.Component{
    render() {
        return (
            <div>
                <HeaderBase />
                    <div id="mainbody">
                        <Authorisation />
                    </div>
            </div>
        )
    }
}
export default App;