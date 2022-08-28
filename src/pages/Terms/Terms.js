import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';

class Terms extends Component {

    componentDidMount(){
        const { t } = this.props;
        //Remove main loader
        mainLoaderToggle('hide');

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.terms,
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

        return (
            <div className="container medium-copy">
                <TitleContent heading="Teilnahmebedingungen"/>
                <div className="s-content-copy">
                    {parse(t('Page.Terms.content'))}
                </div>
            </div>
        );
    }
}

export default withTranslation()(Terms);