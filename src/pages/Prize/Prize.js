import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import Aux from '../../hoc/Auxiliare';
import parse from 'html-react-parser';
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';
import GiftContent from '../../components/Content/GiftContent/GiftContent';
import GiftContentFooter from '../../components/Content/GiftContent/GiftContentFooter';

class Prize extends Component {

    componentDidMount(){
        const { t } = this.props;
        //Remove main loader
        mainLoaderToggle('hide');

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.prize,
                'pageTitle': t('Meta.title')
            }
        });
    }

    componentWillUnmount(){
        //Show mainloader
        mainLoaderToggle('show');
    }

    render() {

        const { t } = this.props;

        let promotionCampaign = window.PROMOTION_CAMPAIGN;

        let image = {
            desktop: '/resources/images/'+promotionCampaign+'/milka-prize.png',
            mobile: '/resources/images/'+promotionCampaign+'/milka-prize-mobile.png'
        };

        let options = {
            btnShow: true,
            hrShow: false
        };

        return (
            <Aux>
                <div className={`content-prize content-prize__${window.PROMOTION_CAMPAIGN}`}>
                    <TitleContent 
                        heading={parse(t('Page.Prize.title'))} 
                        subheading={typeof t('Page.Prize.subtitle') === "string" ? parse(t('Page.Prize.subtitle')) : null}
                        paragraph={parse(t('Page.Prize.paragraph'))}
                    />
                    <GiftContent
                        imageoption={image} 
                        promotionCampaign={promotionCampaign}
                    />
                    {/* <GiftContentFooter options={options} /> */}
                </div>
            </Aux>
        );
    }
}

export default withTranslation()(Prize);