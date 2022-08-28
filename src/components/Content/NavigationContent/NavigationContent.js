import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import GLOBAL_CONFIG from '../../../config/config';
import appGoogleTracking from '../../../modules/googletracking';

/* 
    NavLink is use as internal link for Routing : working as SPA - no page load
    Google tagging plan for NavLink : appGoogleTracking.processEventCTANavLink
*/

class NavigationContent extends Component {

    render() {

        let campaignStatus = this.props.campaign, 
            navRender = null,
            navClass = 'navigation main-nav';

        if(campaignStatus === 'main'){
            navRender = (
                <>
                    <li>
                        <NavLink to={GLOBAL_CONFIG.Route.home} exact activeClassName="active" data-event="info-click" data-category="Informational Action" data-action="Header Tab" data-label="Start" onClick={appGoogleTracking.processEventCTANavLink}>Start</NavLink>
                    </li>
                    <li>
                        <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="info-click" data-category="Informational Action" data-action="Header Tab" data-label="Mitmachen" onClick={appGoogleTracking.processEventCTANavLink}>Mitmachen</NavLink>
                    </li>
                    <li>
                        <NavLink to={GLOBAL_CONFIG.Route.prize} exact data-event="info-click" data-category="Informational Action" data-action="Header Tab" data-label="Gewinne" onClick={appGoogleTracking.processEventCTANavLink}>Gewinne</NavLink>
                    </li>
                    <li>
                        <NavLink to={GLOBAL_CONFIG.Route.faq} exact data-event="info-click" data-category="Informational Action" data-action="Header Tab" data-label="FAQ" onClick={appGoogleTracking.processEventCTANavLink}>FAQ</NavLink>
                    </li>
                </>
            );
        } 

        return (
            <>
                <div className="page__menu navigation-newsletter">
                    <ul className={navClass}>
                        {navRender}
                    </ul>
                </div>
            </>
        );
    }
}

export default NavigationContent;