import React from 'react';
import VideoContent from '../VideoContent/VideoContent';
import parse from 'html-react-parser';

/* 
    Title content on all pages - to display the first part of all pages
    This gives uniformity in all pages in terms of CSS and HTML codes
*/

const Column = (props) => {

    let RenderHeading = (props.heading !== undefined && props.heading !== null) ? <h1>{props.heading}</h1> : null;

    let RenderSubheading = (props.subheading !== undefined && props.subheading !== null) ? <h2>{props.subheading}</h2> : null;

    let RenderParaText = (props.paragraph !== undefined && props.paragraph !== null) ? <p>{props.paragraph}</p> : null;

    let RenderSubheading2 = (props.subheading2 !== undefined && props.subheading2 !== null) ? <h2>{props.subheading2}</h2> : null;

    let ListItems = (props.content !== undefined && props.content !== null) ? <div>{props.content}</div> : null;

    return (
        <div className="s-content-title">
            {RenderHeading}
            <div className='container'>
                <div className='left'>
                    <VideoContent/>
                </div>
                <div className='right right-mw'>
                    {RenderSubheading}
                    {ListItems}
                </div>
            </div>
            {RenderSubheading2}
        </div>
    );
}

export default Column;
