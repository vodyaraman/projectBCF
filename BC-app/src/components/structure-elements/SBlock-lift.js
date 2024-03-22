import React from 'react';
import "../../pages/main-page/Main-page.css";

const SBlockLift = () => {
    const container = document.getElementById("page-scrollbar-container");
    const scrollToTop = () => {
        container.scrollTop = 0;
    };

        return (
            <div className='structure-block-lift'>
                <div id="upper-arrow" onClick={scrollToTop}></div>
            </div>
        );
    }

    export default SBlockLift;