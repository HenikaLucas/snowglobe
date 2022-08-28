import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const footerabout = () => (
    <div className="grid-2-m grid-m-12 grid-s-2-m footer__category js-accordion" data-target="footer-card-4">
        <h4 className="js-footer-accordion" data-target="footer-card-4">
            <a className="footer__title js-event-cta footer-desktop" target="_blank" data-target="footer-card-4" rel="noopener noreferrer" href="https://www.milka.de/uber-milka" title="Über Milka" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="UBER MILKA" onClick={appGoogleTracking.processEventCTA}>Über Milka</a>
            <a className="footer__title js-event-cta footer-mobile" data-target="footer-card-4">Über Milka</a>
            <span className="footer__control js-footer-accordion-icon" data-target="footer-card-4"></span>
        </h4>
        <hr />
        <div className="grid-column footer__links js-footer-accordion-content" data-target-child="footer-card-4">
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/uber-milka/geschichte" target="_blank" rel="noopener noreferrer" title="Geschichte" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Geschichte" onClick={appGoogleTracking.processEventCTA}>Geschichte</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/uber-milka/geschmack" target="_blank" rel="noopener noreferrer" title="Geschmack" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Geschmack" onClick={appGoogleTracking.processEventCTA}>Geschmack</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/uber-milka/schokoladenherstellung" target="_blank" rel="noopener noreferrer" title="Schokoladenherstellung" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Schokoladenherstellung" onClick={appGoogleTracking.processEventCTA} >Schokoladenherstellung</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/uber-milka/engagement" target="_blank" rel="noopener noreferrer" title="Unser Engagement" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Unser Engagement" onClick={appGoogleTracking.processEventCTA}>Unser Engagement</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/uber-milka/hohe-tauern" target="_blank" rel="noopener noreferrer" title="Nationalpark Hohe Tauern" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Nationalpark Hohe Tauern" onClick={appGoogleTracking.processEventCTA}>Nationalpark Hohe Tauern</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/neues/milka-ski-sponsoring" target="_blank" rel="noopener noreferrer" title="Skisponsoring" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Skisponsoring" onClick={appGoogleTracking.processEventCTA}>Skisponsoring</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/neues/milka-ski-sponsoring-geschichte" target="_blank" rel="noopener noreferrer" title="Skisponsoring Geschichte" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Skisponsoring Geschichte" onClick={appGoogleTracking.processEventCTA}>Skisponsoring Geschichte</a>
            </span>
            <span className="footer__link">
                <a className="js-event-cta" href="https://www.milka.de/uber-milka/fake-gewinnspiele" target="_blank" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Fake Gewinnspiele" title="Fake Gewinnspiele" onClick={appGoogleTracking.processEventCTA}>Fake Gewinnspiele</a>
            </span>
        </div>
    </div>
);

export default footerabout;