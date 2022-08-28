import React, { useState } from "react";

const ReadMoreLess = ({limit, children}) => {
    const text = children;
    
    const [isReadMoreShown, setReadMoreShown] = useState(false)

    const toggleBtn = () => {
        setReadMoreShown(prevState => !prevState)
    }
    
    return (
        <div className="read-more-less">
            {isReadMoreShown? text: text.substr(0,limit)}
            <button className="btn" onClick={toggleBtn}>
                {isReadMoreShown? 'See less':'...See more'}
            </button>
        </div>
    );
}
 
export default ReadMoreLess;