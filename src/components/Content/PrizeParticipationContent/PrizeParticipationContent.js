import React from 'react';
import { NavLink } from 'react-router-dom';
import GLOBAL_CONFIG from '../../../config/config';
import appGoogleTracking from '../../../modules/googletracking'; 
import { timeStamp } from '../../../modules/helpers';

const PrizeParticipationContent = (props) => {

    return (
        <div className="s-content-prize__participation">
            <h3>Nutze deine Chance und werde mit etwas <span>Glück ein Milka Glücksgewinner!</span></h3>
            <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}>
                <div className="btn__container btn--secondary-dark btn--hover alert">
                    <span className="btn__text">JETZT MITMACHEN</span>
                </div>
            </NavLink>
            <p>Die Gewinner werden schriftlich per E-Mail innerhalb von 24 Stunden über den Gewinn benachrichtigt. Übrigens: Während des Aktionszeitraums vom 01.09. bis 15.11.2020 kannst du insgesamt dreimal mit jeweils unterschiedlichen Kassenbons teilnehmen. Vorausgesetzt, der Kassenbon ist aus dem Zeitraum vom 1.9. bis 31.10.2020.</p>
        </div>
    );
}

export default PrizeParticipationContent;

