import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';
import Aux from '../../../hoc/Auxiliare';

class MenuContent extends Component {

    render() {
        const { t } = this.props;

        return (
            <Aux>
                <div className="header__navigations">
                <ul>
                    <li>
                    <a
                        className="header__navigation js-event-cta"
                        data-event="info-click"
                        data-category="Informational Action"
                        data-action="Header Tab"
                        data-label="Inspiratie"
                        rel="noopener noreferrer"
                        href="#"
                    >
                        Inspiratie
                    </a>
                    </li>
                    <li>
                    <a
                        className="header__navigation js-event-cta"
                        data-event="info-click"
                        data-category="Informational Action"
                        data-action="Header Tab"
                        data-label="Uitleg video"
                        rel="noopener noreferrer"
                        href="#uitleg"
                    >
                        Uitleg video
                    </a>
                    </li>
                    <li>
                    <a
                        className="header__navigation js-event-cta"
                        data-event="info-click"
                        data-category="Informational Action"
                        data-action="Header Tab"
                        data-label="Hoe kan ik meedoen?"
                        rel="noopener noreferrer"
                        href="#meedoen"
                    >
                        Hoe kan ik meedoen?
                    </a>
                    </li>
                    <li>
                    <a
                        className="header__navigation js-event-cta"
                        data-event="info-click"
                        data-category="Informational Action"
                        data-action="Header Tab"
                        data-label="Actievoorwaarden"
                        rel="noopener noreferrer"
                        href="#actievoorwaarden"
                    >
                        Actievoorwaarden
                    </a>
                    </li>
                </ul>
                </div>
            </Aux>
        );
    }
}
  
  export default withTranslation()(MenuContent);