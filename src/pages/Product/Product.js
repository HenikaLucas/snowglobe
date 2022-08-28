import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle, timeStamp } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';

const ProductModel = {

    contentTitle: {
        heading: 'Mit Milka zu deinen Glücksgewinnen',
        subheading: 'Entdecke deine Milka Lieblingsprodukte',
        paragraph: 'Bei Milka findest du garantiert dein Lieblingsprodukt, dass dich deinem Glücksgewinn näher bringt. Ob als klassische Milka Tafeln, Milka Großtafeln, kombiniert mit knackigen Keksen, oder eine der weiteren vielen Milka Köstlichkeiten – die zarte Milka Alpenmilch Schokolade ist immer perfekt als Snack für zwischendurch oder zum Teilen mit deinen Liebsten.'
    }
   
};

class Product extends Component {

    componentDidMount(){
        //Remove main loader
        mainLoaderToggle('hide');

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.product,
                'pageTitle': document.title
            }
        });
    }

    componentWillUnmount(){
        //Show mainloader
        mainLoaderToggle('show');
    }

    render() {

        //<p className="image-caption">Milka Produkte entdecken</p>

        return (
            <div className="s-content-product">
                <TitleContent 
                    heading={ProductModel.contentTitle.heading} 
                    subheading={ProductModel.contentTitle.subheading}
                    paragraph={ProductModel.contentTitle.paragraph}
                />
                <img src="/resources/images/milka-product.png" width="750" height="351" alt="products" />
                <p className="image-caption">&nbsp;</p>
                <a href="https://www.milka.de/alle-produkte" target="_blank" rel="noopener noreferrer" className="js-event-cta" data-event="info-click" data-category="Informational Action" data-action="See More Product" onClick={appGoogleTracking.processEventCTA}>
                    <div className="btn__container btn--secondary-lilac btn--hover">
                        <span className="btn__text">ENTDECKE DIE MILKA PRODUKTE</span>
                    </div>
                </a>
                <div className="s-content-title product">
                    <p className="subheading">Nutze deine Chance und werde mit etwas <span>Glück ein Milka Glücksgewinner!</span></p>
                    <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}>
                        <div className="btn__container btn--secondary-dark btn--hover alert">
                            <span className="btn__text">JETZT MITMACHEN</span>
                        </div>
                    </NavLink>
                </div>

            </div>
        );
    }
}

export default Product;