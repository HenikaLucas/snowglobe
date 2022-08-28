import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const footerfcmilka = () => (
    <div className="grid-2-m grid-m-12 grid-s-2-m footer__category js-accordion" data-target="footer-card-1">
        <h4 className="js-footer-accordion" data-target="footer-card-1">
            <a className="footer__title js-event-cta footer-desktop" data-target="footer-card-5" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Produkte" href="https://www.fcmilka.de/" title="FC Milka" onClick={appGoogleTracking.processEventCTA}>FC Milka</a>
            <a className="footer__title js-event-cta footer-mobile" data-target="footer-card-5">FC Milka</a>
            <span className="footer__control js-footer-accordion-icon" data-target="footer-card-5"></span>
        </h4>
        <hr />
        <div className="grid-column footer__links js-footer-accordion-content" data-target-child="footer-card-5">
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.fcmilka.de/alle-aktionen" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Milka und die Bundesliga" title="Milka und die Bundesliga" onClick={appGoogleTracking.processEventCTA}>Milka und die Bundesliga</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.fcmilka.de/account" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="FC Milka" title="FC Milka" onClick={appGoogleTracking.processEventCTA}>FC Milka</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.fcmilka.de/fanCenter" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Fan-Center" title="Fan-Center" onClick={appGoogleTracking.processEventCTA}>Fan-Center</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.fcmilka.de/" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Gewinne dein Heimspiel" title="Gewinne dein Heimspiel" onClick={appGoogleTracking.processEventCTA}>Gewinne dein Heimspiel</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.fcmilka.de/fairplay" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Fairplay" title="Fairplay" onClick={appGoogleTracking.processEventCTA}>Fairplay</a>
            </span>
        </div>
    </div>
);

export default footerfcmilka;