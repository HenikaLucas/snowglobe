import React from 'react';
import Aux from '../../hoc/Auxiliare';
import _LOCAL_DATE from '../../Models/CampaignDate';
import HeaderContent from '../../components/Content/HeaderContent/HeaderContent';
import VideoSlider from '../Content/VideoSlider/VideoSlider';


const banner = (props) => {

    let visual = `/resources/images/Keyvisual.png`;
    let arrow = `/resources/images/icons/Arrow.png`;

    let {campaignStatus, promotionCampaign} = props,
        status = campaignStatus,
        mobileImage = `/resources/images/WinterLandscape_mobile.png`,
        desktopImage = `/resources/images/WinterLandscape_desktop.png`;

    // status = "holding"
    if(status === 'holding') {
        mobileImage = `/resources/images/winter-bg.png`;
        desktopImage = `/resources/images/winter-bg.png`;
    } else if(status === 'end') {
        mobileImage = `/resources/images/winter-bg.png`;
        desktopImage = `/resources/images/winter-bg.png`;
    }

    return (
        <Aux>
            <div className="header-wrapper">
                <picture>
                    <source srcSet={desktopImage} media="(min-width: 1024px)" />
                    <source srcSet={mobileImage} media="(max-width: 481px)" />
                    {/* <source srcSet={mobileImage} media="(min-width: 200px)" /> */}
                    <img className="header-image" src={desktopImage} alt="Milka Christmas" />
                </picture>
                <div className="header-contents">
                    <div className="header-icon">
                        <a href="#" >
                            <img src={arrow} alt="arrow" />
                        </a>
                    </div>
                    <VideoSlider />

                </div>
            </div>
        </Aux>
    );

}

export default banner;