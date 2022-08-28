import React from 'react';
import { NavLink } from 'react-router-dom';
import GLOBAL_CONFIG from '../../../config/config';
import appGoogleTracking from '../../../modules/googletracking';

const NewsContent = () => (

    <div className="announcement-banner__container content">
        <span className="announcement-banner__text field-text">
            Du hast weitere Fragen zur Aktion? Hier geht es zu den <NavLink to={GLOBAL_CONFIG.Route.faq} exact data-event="info-click" data-category="Informational Action" data-action="Read FAQ" onClick={appGoogleTracking.processEventCTANavLink}>FAQ.</NavLink>
        </span>
    </div>
);

export default NewsContent;