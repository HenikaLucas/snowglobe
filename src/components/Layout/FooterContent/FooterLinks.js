import React from 'react';
import appGoogleTracking from '../../../modules/googletracking';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const footerlinks = () => (
    <div className="footer__legal">
        <span className="legal__link">
            <a className="js-event-cta" href="https://www.milka.de/Static/bedingungen-zur-nutzung" target="_blank" rel="noopener noreferrer" title="BEDINGUNGEN ZUR NUTZUNG" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="BEDINGUNGEN ZUR NUTZUNG" onClick={appGoogleTracking.processEventCTA}>BEDINGUNGEN ZUR NUTZUNG</a>
        </span>
        <span className="legal__link">
            <a className="js-event-cta" href="https://eu.mondelezinternational.com/privacy-notice?sc_lang=de-de&amp;siteID=7GTws0jSEtgtqGQHH57lZw%3D%3D" target="_blank" rel="noopener noreferrer" title="DATENSCHUTZERKLÄRUNG" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="DATENSCHUTZERKLÄRUNG" onClick={appGoogleTracking.processEventCTA}>DATENSCHUTZERKLÄRUNG</a>
        </span>
        <span className="legal__link">
            <a className="js-event-cta" href="https://www.milka.de/Static/impressum" title="IMPRESSUM" target="_blank" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="NEUES" onClick={appGoogleTracking.processEventCTA}>IMPRESSUM</a>
        </span>
        <span className="legal__link">
            <a className="js-event-cta" href="https://www.milka.de/Static/nutzungsbasierte-online-werbung" target="_blank" rel="noopener noreferrer" title=" NUTZUNGSBASIERTE ONLINE-WERBUNG" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="NUTZUNGSBASIERTE ONLINE-WERBUNG" onClick={appGoogleTracking.processEventCTA}>NUTZUNGSBASIERTE ONLINE-WERBUNG</a>
        </span>
        <span className="legal__link">
            <a className="js-event-cta" href="https://www.milka.de/Static/mondelez-international" target="_blank" rel="noopener noreferrer" title="MONDELEZ INTERNATIONAL" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="MONDELEZ INTERNATIONAL" onClick={appGoogleTracking.processEventCTA}>MONDELEZ INTERNATIONAL</a>
        </span>
        <span className="legal__link">
            <a className="js-event-cta" href="/cookie" title=" COOKIE RICHTLINIE" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="COOKIE RICHTLINIE" onClick={appGoogleTracking.processEventCTA}>COOKIE RICHTLINIE</a>
        </span>
        <span className="legal__link">
            <a className="js-event-cta" href="https://contactus.mdlzapps.com/form?siteId=7GTws0jSEtgtqGQHH57lZw%3D%3D" target="_blank" rel="noopener noreferrer" title="Kontakt" data-event="info-click" data-category="Informational Action" data-action="Footer Link" data-label="Kontakt" onClick={appGoogleTracking.processEventCTA}>Kontakt</a>
        </span>
    </div>      
);

export default footerlinks;