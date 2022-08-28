import React from 'react';

const GiftContent = (props) => {

    let classSet = null;

    if(props.primaryoption === undefined){
        classSet = ( (props.promotionCampaign !== undefined) && (props.promotionCampaign === 'muller' || props.promotionCampaign === 'rewe') ) ? 's-content-gift secondary-bg' : 's-content-gift third-bg';
    } else {
        classSet = 's-content-gift';
    }

    return (
        <div className={classSet + props.classModifier}>
            <picture>
                <source srcSet={props.imageoption.desktop} media="(min-width: 1024px)" />
                <source srcSet={props.imageoption.desktop} media="(min-width: 481px)" />
                <source srcSet={props.imageoption.mobile} media="(min-width: 200px)" />
                <img src={props.imageoption.desktop} alt="Milka Christmas product" />
            </picture>
        </div>
    );
}

export default GiftContent;
