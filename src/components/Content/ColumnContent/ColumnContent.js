import React from 'react';
import VideoContent from '../VideoContent/VideoContent';
import parse from 'html-react-parser';
import ReadMoreLess from '../ReadMoreLess/ReadMoreLess';

/* 
    Title content on all pages - to display the first part of all pages
    This gives uniformity in all pages in terms of CSS and HTML codes
*/

const ColumnContent = (props) => {

    let RenderHeading = (props.heading !== undefined && props.heading !== null) ? <h1>{props.heading}</h1> : null;

    let RenderSubheading = (props.subheading !== undefined && props.subheading !== null) ? <h2>{props.subheading}</h2> : null;

    let RenderSubheading2 = (props.subheading2 !== undefined && props.subheading2 !== null) ? <h2>{props.subheading2}</h2> : null;
    
    let RenderParaText2 = (props.paragraph2 !== undefined && props.paragraph2 !== null) ? <p>{props.paragraph2}</p> : null;

    return (
        <div className="s-content-title" id='actievoorwaarden'>
            {RenderHeading}
            <div className='container'>
                <div className='text'>
                    {RenderSubheading}
                    <ReadMoreLess limit={300}>
                        {props.paragraph}
                    </ReadMoreLess>
                   
                </div>
            </div>
        </div>
    );
}

export default ColumnContent;
