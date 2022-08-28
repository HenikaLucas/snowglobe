import React from 'react';
import { NavLink } from 'react-router-dom';
import GLOBAL_CONFIG from '../../../config/config';
import appGoogleTracking from '../../../modules/googletracking';

const GiftContentFooter = (props) => { 

    let btnContent = null,
        { btnShow, hrShow, classModifier, options } = props;

    if((!!props.options && props.options.btnShow === true) || btnShow){
        btnContent = (
            <NavLink to={GLOBAL_CONFIG.Route.home} exact data-event="info-click" data-category="Informational Action" data-action="Start Page" data-label={window.META_TITLE} onClick={appGoogleTracking.processEventCTANavLink}>
                <div className="btn__container btn--secondary-lilac btn--hover">
                    <span className="btn__text">Zurück zur Startseite</span>
                </div>
            </NavLink>
        );   
    }

    let classname = ((!!props.options && props.options.hrShow === true) || hrShow) ? 'content-gift-footer hr' : 'content-gift-footer';

    return (
        <div className={!!classModifier ? `${classname} ${classModifier}` : classname}>
            {btnContent}
            <div className="content-faq s-content-copy marge-bottom">
                <div className="s-content-copy__item footer">
                    <p className="headings">Habt ihr noch Fragen zur Aktion?</p>
                    <p><NavLink to={GLOBAL_CONFIG.Route.faq} exact data-event="info-click" data-category="Informational Action" data-action="React FAQ" data-label={window.META_TITLE} onClick={appGoogleTracking.processEventCTANavLink}>Hier</NavLink> geht es zu den FAQ</p>
                </div>
            </div>
        </div>
    );
}

export default GiftContentFooter;
