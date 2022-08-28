import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const footernews = () => (
    <div className="grid-2-m grid-m-12 grid-s-2-m footer__category js-accordion" data-target="footer-card-3">
        <h4 className="js-footer-accordion" data-target="footer-card-3">
            <a className="footer__title footer-desktop" href="https://www.milka.de/neues" data-target="footer-card-3" target="_blank" rel="noopener noreferrer" title="Neues" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="NEUES" onClick={appGoogleTracking.processEventCTA}>Neues</a>
            <a className="footer__title footer-mobile" data-target="footer-card-3">Neues</a>
            <span className="footer__control js-footer-accordion-icon" data-target="footer-card-3"></span>
        </h4>
        <hr />
        <div className="grid-column footer__links js-footer-accordion-content" data-target-child="footer-card-3">
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.fcmilka.de/" target="_blank" rel="noopener noreferrer" title="FC Milka" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="FC Milka" onClick={appGoogleTracking.processEventCTA}>FC Milka</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/zarte-botschaft" target="_blank" rel="noopener noreferrer" title="Zarte Botschaft" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Zarte Botschaft" onClick={appGoogleTracking.processEventCTA}>Zarte Botschaft</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/neues/haselnusscreme" target="_blank" rel="noopener noreferrer" title="Haselnusscreme" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Haselnusscreme" onClick={appGoogleTracking.processEventCTA}>Haselnusscreme</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/neues/suesses-mitbringsel" target="_blank" rel="noopener noreferrer" title="Süßes Mitbringsel" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Süßes Mitbringsel" onClick={appGoogleTracking.processEventCTA}>Süßes Mitbringsel</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/produkte/milka-cookie-sensations-oreo-156g" target="_blank" rel="noopener noreferrer" title="Cookie Sensations Oreo" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Cookie Sensations Oreo" onClick={appGoogleTracking.processEventCTA}>Cookie Sensations Oreo</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/Brands/Milka/de/Home/neues-not-used/mmmax-strawberry-cheesecake" target="_blank" rel="noopener noreferrer" title="Mmmax Strawberry Cheesecake" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Mmmax Strawberry Cheesecake" onClick={appGoogleTracking.processEventCTA}>Mmmax Strawberry Cheesecake</a>
            </span>
        </div>
    </div>
);

export default footernews;