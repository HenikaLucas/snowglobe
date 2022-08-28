import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';
import Aux from '../../../hoc/Auxiliare';

class MetaHeader extends Component {

    render() {
        const { t } = this.props;

        window.META_TITLE = t('Meta.title');

        return (
            <Aux>
                <Helmet>
                    <title>{t('Meta.title')}</title>
                    <meta name="description" content={t('Meta.description')} />
                    <meta property="og:url" content={t('Meta.ogUrl')} /> 
                    <meta property="og:title" content={t('Meta.ogTitle')} />
                    <meta property="og:description" content={t('Meta.ogDescription')} />
                    <meta property="og:site_name" content={t('Meta.ogSitename')} />
                    <meta property="og:image" content={t('Meta.ogImage')} />
                    <body className={this.props.promotionCampaign} />
                </Helmet>
            </Aux>
        );
    }
}
  
  export default withTranslation()(MetaHeader);