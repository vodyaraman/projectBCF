import React from 'react';
import "../../pages/main-page/Main-page.css";

const SBlockLift = () => {
    const container = document.getElementById("page-scrollbar-container");
    const scrollToTop = () => {
        container.scrollTop = 0;
    };

    const scrollToBottom = () => {
        container.scrollTop = container.scrollHeight;
    };

        return (
            <div className='structure-block-lift'>
                <div id="upper-arrow" onClick={scrollToTop}></div>
                <div id="bottom-arrow" onClick={scrollToBottom}></div>
            </div>
        );
    }

    export default SBlockLift;