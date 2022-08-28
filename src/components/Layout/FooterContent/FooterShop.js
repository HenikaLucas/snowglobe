import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const footershop = () => (
    <div className="grid-2-m grid-m-12 grid-s-2-m footer__category js-accordion" data-target="footer-card-2">
        <h4 className="js-footer-accordion" data-target="footer-card-2">
            <a className="footer__title js-event-cta footer-desktop" data-target="footer-card-2" href="https://www.milka.de/shop?utm_source=von-milka-fuer-dich.milka.de&utm_medium=website&utm_campaign=timetogiveback" target="_blank" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="SHOP" title="Shop" onClick={appGoogleTracking.processEventCTA}>Shop</a>
            <a className="footer__title js-event-cta footer-mobile" data-target="footer-card-2">Shop</a>
            <span className="footer__control js-footer-accordion-icon" data-target="footer-card-2"></span>
        </h4>
        <hr />
        <div className="grid-column footer__links js-footer-accordion-content" data-target-child="footer-card-2">
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/shop/schokoladen-geschenke" target="_blank" rel="noopener noreferrer" title="Schokoladen Geschenke" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Schokoladen Geschenke" onClick={appGoogleTracking.processEventCTA}>Schokoladen Geschenke</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/shop/personalisierte-schokolade" target="_blank" rel="noopener noreferrer" title="Personalisierte Schokolade" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Personalisierte Schokolade" onClick={appGoogleTracking.processEventCTA}>Personalisierte Schokolade</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/shop/herzlichen-glueckwunsch-sagen" target="_blank" rel="noopener noreferrer" title="Herzlichen Glückwunsch sagen" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Herzlichen Glückwunsch sagen" onClick={appGoogleTracking.processEventCTA}>Herzlichen Glückwunsch sagen</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/shop/alles-liebe-sagen" target="_blank" rel="noopener noreferrer" title="Alles Liebe sagen" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Alles Liebe sagen" onClick={appGoogleTracking.processEventCTA}>Alles Liebe sagen</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/shop/danke-sagen" target="_blank" rel="noopener noreferrer" title="Danke sagen" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Danke sagen" onClick={appGoogleTracking.processEventCTA}>Danke sagen</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/shop/alles-gute-wuenschen" target="_blank" rel="noopener noreferrer" title="Alles Gute wünschen" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Alles Gute wünschen" onClick={appGoogleTracking.processEventCTA}>Alles Gute wünschen</a>
            </span>
        </div>
    </div>
);

export default footershop;