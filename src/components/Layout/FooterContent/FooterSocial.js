import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const footersocial = () => (
    <div className="footer__social">
        <a className="js-event-cta" href="#" target="_blank" rel="noopener noreferrer" data-event="social-click" data-category="Social Action" data-action="Social share" data-label="Facebook" rel="noopener noreferrer" onClick={appGoogleTracking.processEventCTA}>
            <span className="icon-facebook"></span>
        </a>
        <a className="js-event-cta" href="#" target="_blank" rel="noopener noreferrer" data-event="social-click" data-category="Social Action" data-action="Social share" data-label="Instagram" rel="noopener noreferrer" onClick={appGoogleTracking.processEventCTA}>
            <span className="icon-instagram"></span>
        </a>
        <a className="js-event-cta" href="#" target="_blank" rel="noopener noreferrer" data-event="social-click" data-category="Social Action" data-action="Social share" data-label="Pinterest" rel="noopener noreferrer" onClick={appGoogleTracking.processEventCTA}>
            <img src="resources/images/icons/TikTok.png" alt="tiktok" />
        </a>
        <span className="text">#milkasnowglobe</span>
    </div>
);

export default footersocial;