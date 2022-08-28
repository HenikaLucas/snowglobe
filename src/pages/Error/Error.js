import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';
import Aux from '../../hoc/Auxiliare';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle  } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';

const ErrorModel = {

    contentTitle: {
        heading: parse('Entschuldigung!<br />Hier ist etwas schief gegangen.<br />angeforderte Seite ist leider nicht verfügbar.')
    }   
};

class Error extends Component {

    componentDidMount(){
        const { t } = this.props;
        //Remove main loader
        mainLoaderToggle('hide');

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': '/',
                'pageTitle': t('Meta.title')
            }
        });
    }

    componentWillUnmount(){
        //Show mainloader
        mainLoaderToggle('show');
    }

    render() {

        return (
            <Aux>
                <br />
                <br />
                <TitleContent 
                    heading={ErrorModel.contentTitle.heading} 
                />
                <br />
                <br />
            </Aux>
        );
    }
}

export default withTranslation()(Error);