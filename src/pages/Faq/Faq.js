import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';
import Aux from '../../hoc/Auxiliare';
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';
import StepContent from '../../components/Content/StepContent/StepContent';
import GiftContentFooter from '../../components/Content/GiftContent/GiftContentFooter';
import { NavLink } from 'react-router-dom';

class Faq extends Component {
    constructor() {
        super();
        this.Mapping = [
            "one",
            "two",
            "three",
            "four",
            "five"
        ]
        this.state = {
            isMobile: false
        }
        this.resize = this.resize.bind(this);
    }
    
    resize() {
        // set isMobile to true if the device is a mobile and false otherwise 
        this.setState({isMobile: window.innerWidth <= 768});
    }
    
    componentDidMount(){
        const { t } = this.props;
        //Remove main loader
        mainLoaderToggle('hide');

        const elementSelector = document.querySelectorAll('.content-faq p a'),
            elementSelectorLength = elementSelector.length;

        for(let i=0; i < elementSelectorLength; i++){
            elementSelector[i].addEventListener('click', function(event){
                appGoogleTracking.dataLayerPush({
                    'dataEvent': 	'info-click',
                    'dataCategory': 'Informational Action',
                    'dataAction': 	'Links',
                    'dataLabel': 	t('Meta.title')
                });
            });
        }

         //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.faq,
                'pageTitle': t('Meta.title')
            }
        });
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount(){
        //Show mainloader
        mainLoaderToggle('show');
    }

    displayTitle(t){
        if(window.PROMOTION_CAMPAIGN == "rewe"){
            return (
                <div class="s-content-title">
                    <h1>
                        FAQ´ s - Die vollständigen TNB´ s findest du <NavLink to={GLOBAL_CONFIG.Route.terms} exact data-event="button-click" data-category="Click Action" data-action="Terms" onClick={appGoogleTracking.processEventCTANavLink}><>hier.</></NavLink>
                    </h1>
                </div>
            )
        } else if(window.PROMOTION_CAMPAIGN == "muller"){
            return (
                <div class="s-content-title">
                    <h1>
                        So einfach geht’s
                    </h1>
                </div>
            )
        }else if(window.PROMOTION_CAMPAIGN == "kaufland"){
            return (
                <div class="s-content-title">
                    <h1>
                        FAQs - Die vollständigen Teilnahmebedingungen findest du <NavLink to={GLOBAL_CONFIG.Route.terms} exact data-event="button-click" data-category="Click Action" data-action="Terms" onClick={appGoogleTracking.processEventCTANavLink}><>hier.</></NavLink>
                    </h1>
                </div>
            )
        }else if(window.PROMOTION_CAMPAIGN == "edeka" || window.PROMOTION_CAMPAIGN == "netto"){
            return (
                <div class="s-content-title">
                    <h1>
                        FAQ
                    </h1>
                </div>
            )
        }
        return null;
    }

    render() {
        const { t } = this.props;
        let classNameDeco = "content-faq-deco ";
        if(window.PROMOTION_CAMPAIGN === "rewe"){
            classNameDeco += "rewe"
        }
        return (
            <Aux>
                <div className={`content-faq__${window.PROMOTION_CAMPAIGN}`}>
                    {this.displayTitle(t)}
                    <StepContent title={ this.state.isMobile ? t('Page.Faq.stepsTitle.mobile') : t('Page.Faq.stepsTitle.desktop')} t={t} />
                    <div className="content-faq s-content-copy">
                        <div className={classNameDeco}>
                            {
                                t("Page.Faq.decoration", { returnObjects: true }).map((item, index) => {
                                    return <img key={index} src={item} alt={`Decoration ${index}`} className={this.Mapping[index]}/>
                                })
                            }
                        </div>

                        {parse(t('Page.Faq.content'))}
                    </div>
                </div>
                
            </Aux>
        );
    }
}

export default withTranslation()(Faq);