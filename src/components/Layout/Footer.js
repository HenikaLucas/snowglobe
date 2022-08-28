import React from 'react';
import FooterLogo from './FooterContent/FooterLogo';
import FooterProduct from './FooterContent/FooterProduct';
import FooterShop from './FooterContent/FooterShop';
import FooterNews from './FooterContent/FooterNews';
import FooterAbout from './FooterContent/FooterAbout';
import FooterLinks from './FooterContent/FooterLinks';
import FooterSocial from './FooterContent/FooterSocial';
import FooterNewsletter from './FooterContent/FooterNewsletter';
import FooterCopyright from './FooterContent/FooterCopyright';
import FooterFCMilka from './FooterContent/FooterFCMilka';
import { NavLink } from 'react-router-dom';
import GLOBAL_CONFIG from '../../config/config';




const footer = () => (
    <footer className='footer-wrapper'>
        <picture>
            <source srcSet="/resources/images/Pages/bg-pattern/bg-footer.png" media="(min-width: 1024px)" />
            <source srcSet="/resources/images/Pages/bg-pattern/bg-footer-mobile.png" media="(max-width: 481px)" />
            {/* <source srcSet="/resources/images/Pages/bg-pattern/bg-footer-mobile.png" media="(min-width: 200px)" /> */}
            <img className="footer-image" src="/resources/images/Pages/bg-pattern/bg-footer.png" alt="background" />
        </picture>
        <div className="footer-contents">
            <div className='footer-top'>
                <NavLink to={GLOBAL_CONFIG.Route.home} exact data-event="info-click" data-category="Informational Action" data-action="Start Page" data-label={window.META_TITLE} >
                    <div className="footer-logo">
                        <img src="resources/images/Titel.png" alt="logo" />
                    </div>
                </NavLink>
            </div>
        </div>
        <div className='footer-bottom'>
            <div className='footer-bottom-content'>
                <FooterSocial />
            </div>
        </div>
    </footer>
); 

export default footer;