import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const footerproduct = () => (
    <div className="grid-2-m grid-m-12 grid-s-2-m footer__category js-accordion" data-target="footer-card-1">
        <h4 className="js-footer-accordion" data-target="footer-card-1">
            <a className="footer__title js-event-cta footer-desktop" data-target="footer-card-1" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Produkte" href="https://www.milka.de/alle-produkte" title="Produkte" onClick={appGoogleTracking.processEventCTA}>Produkte</a>
            <a className="footer__title js-event-cta footer-mobile" data-target="footer-card-1">Produkte</a>
            <span className="footer__control js-footer-accordion-icon" data-target="footer-card-1"></span>
        </h4>
        <hr />
        <div className="grid-column footer__links js-footer-accordion-content" data-target-child="footer-card-1">
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/alle-produkte/neu" target="_blank" rel="noopener noreferrer" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Neu" title="Neu" onClick={appGoogleTracking.processEventCTA}>Neu</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/alle-produkte/tafel-schokolade" target="_blank" rel="noopener noreferrer" title="Tafel Schokolade" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Tafel Schokolade" onClick={appGoogleTracking.processEventCTA}>Tafel Schokolade</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/alle-produkte/kekse-und-kuechlein" target="_blank" rel="noopener noreferrer" title="Kekse und Küchlein" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Kekse und Küchlein" onClick={appGoogleTracking.processEventCTA}>Kekse und Küchlein</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/alle-produkte/pralinen" target="_blank" rel="noopener noreferrer" title="Pralinen" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Pralinen" onClick={appGoogleTracking.processEventCTA}>Pralinen</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/alle-produkte/schoko-snacks" target="_blank" rel="noopener noreferrer" title="Schoko Snacks" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Schoko Snacks" onClick={appGoogleTracking.processEventCTA}>Schoko Snacks</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/alle-produkte/schokoriegel" target="_blank" rel="noopener noreferrer" title="Schokoriegel" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Schokoriegel" onClick={appGoogleTracking.processEventCTA}>Schokoriegel</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/alle-produkte/brotaufstrich" target="_blank" rel="noopener noreferrer" title="Schokoriegel" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Brotaufstrich" onClick={appGoogleTracking.processEventCTA}>Brotaufstrich</a>
            </span>
        </div>
    </div>
);

export default footerproduct;