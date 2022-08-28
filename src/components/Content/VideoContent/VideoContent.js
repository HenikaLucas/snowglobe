import React from 'react';
import parse from 'html-react-parser';

/* 
    Title content on all pages - to display the first part of all pages
    This gives uniformity in all pages in terms of CSS and HTML codes
*/

const VideoContent = (props) => {

    return (
        <div className='videoHolder'>
            <video controls >
                <source src="#" type="video/mp4"/>
            </video>
        </div>
    );
}

export default VideoContent;
