import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser'; 
import GLOBAL_CONFIG from '../../config/config'; 
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle, navParticipationMenu, scrollToElement } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';
import GiftContent from '../../components/Content/GiftContent/GiftContent';
import GiftContentFooter from '../../components/Content/GiftContent/GiftContentFooter';

class ThankYou extends Component {

    componentWillMount(){
        if(sessionStorage.getItem(GLOBAL_CONFIG.Session.userstatus) === null && sessionStorage.getItem(GLOBAL_CONFIG.Session.userstatus)  !== 'participate'){
            //Go to particaption page
            this.props.history.push({pathname: GLOBAL_CONFIG.Route.participation});
        } else {
            sessionStorage.removeItem(GLOBAL_CONFIG.Session.userstatus)
        }
    }

    componentDidMount(){
        const { t } = this.props;
        //Active menu participation - mitmachen
        navParticipationMenu(true);

        //Scroll to navigation menu
        scrollToElement();

        //Remove main loader
        mainLoaderToggle('hide');

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.thankyou,
                'pageTitle': t('Meta.title'),
                'ParticipantId' : window.PARTICIPATION_ID
            }
        });
    }

    componentWillUnmount(){
        //Remove active menu participation - mitmachen
        navParticipationMenu(false);

        //Show mainloader
        mainLoaderToggle('show');
    }

    DisplayCards(t){
        const boxs = t("Page.Confirmation.boxs", { returnObjects: true });
        return (
            <div className="s-card-container">
                {
                    boxs.map(({img, platzhalter, title, copy, button}) =>(
                        <div className="s-card">
                            <img src={img} alt=""/>
                            { platzhalter ? (<img src={platzhalter} alt="" className="platzhalter"/>) : null}
                            <div className="s-card__copy">
                                <h3>{parse(title)}</h3>
                                <p>{parse(copy)}</p>
                                <a href={button.href} target="_blank">
                                    <div className="btn__container btn--secondary-lilac btn--hover">
                                        <span className="btn__text"> {button.text} </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

    render() { 
        const { t } = this.props;

        let image = {
            desktop: t('Page.Confirmation.bottomBanner.desktop'),
            mobile: t('Page.Confirmation.bottomBanner.mobile')
        };

        let options = {
            btnShow: true,
            hrShow: false
        };

        return (
            <div className={`content-confirmation content-confirmation__${window.PROMOTION_CAMPAIGN}`}>
                <TitleContent 
                    heading={parse(t('Page.Confirmation.title'))}
                    subheading={parse(t('Page.Confirmation.subTitle'))}
                />
                {this.DisplayCards(t)}
                <GiftContent imageoption={image} primaryoption={true} classModifier={image.mobile === false ? " no-mobile" : "" }/>
                <GiftContentFooter options={options} />
            </div>
        );
    }
}

export default withTranslation()(ThankYou);