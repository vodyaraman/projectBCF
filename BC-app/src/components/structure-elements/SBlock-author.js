import React from 'react';
import "../../pages/main-page/Main-page.css"
    
const SBlockAuthor = (thisAuthor) => {
    return(
        <div className='structure-block-author'>
            <div className="main-text">{thisAuthor.user}</div>
        </div> 
        
    );
}

export default SBlockAuthor