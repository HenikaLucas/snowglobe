import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const meedoensocial = () => (
    <div className="meedoen__social">
        <a className="js-event-cta" href="#" target="_blank" rel="noopener noreferrer" data-event="social-click" data-category="Social Action" data-action="Social share" data-label="Facebook" rel="noopener noreferrer" onClick={appGoogleTracking.processEventCTA}>
            <img src="resources/images/icons/FB_grd.png" alt="fb" />
        </a>
        <a className="js-event-cta" href="#" target="_blank" rel="noopener noreferrer" data-event="social-click" data-category="Social Action" data-action="Social share" data-label="Instagram" rel="noopener noreferrer" onClick={appGoogleTracking.processEventCTA}>
            <img src="resources/images/icons/Insta_grd.png" alt="insta" />
        </a>
        <a className="js-event-cta" href="#" target="_blank" rel="noopener noreferrer" data-event="social-click" data-category="Social Action" data-action="Social share" data-label="Pinterest" rel="noopener noreferrer" onClick={appGoogleTracking.processEventCTA}>
            <img src="resources/images/icons/TikTok_grd.png" alt="tiktok" />
        </a>
    </div>
);

export default meedoensocial;