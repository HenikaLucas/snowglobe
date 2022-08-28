import React from 'react';
import appGoogleTracking from '../../modules/googletracking';
import MenuContent from '../Content/MenuContent/MenuContent';

/*
    Google tagging plan added on links using : appGoogleTracking.processEventCTA
*/

const header = () => {
   
    return (
        <header>
            <nav className="js-header header__container">
                <div className="header__head">
                    <img className="header__pull js-pull-animate" src="resources/images/icons/Pull_Out_Shape.svg" alt="print" />
                    <div className="js-hamburger header__menu" id="hamburger-m"><span className="menu-line"></span><span className="menu-line"></span> <span className="menu-line"></span><span className="menu-line"></span></div>
                    <div className="header__logo">
                        <a href="#" ><img src="resources/images/Titel.png" alt="logo" /></a>
                    </div>
                    <div className="header__icons">
                        <a href="#"><img src="resources/images/flag.png" alt="flag" /><img src="resources/images/icons/arrow_white.png" alt="arrow" /></a>
                    </div>
                </div>
                <div className="header__content js-ham-content">
                    <div className="header__head">
                        <div className="js-ham-close"><img src="resources/images/icons/close_bar.png" alt="close" /></div>
                    </div>
                    <MenuContent/>
                </div>
            </nav>
            {/* <nav className="js-header header-md__container">
            <div className="header__head">
                    <img className="header__pull js-pull-animate" src="resources/images/icons/Pull_Out_Shape.svg" alt="print" />
                    <div className="js-hamburger header__menu" id="hamburger-m"><span className="menu-line"></span><span className="menu-line"></span> <span className="menu-line"></span><span className="menu-line"></span></div>
                    <div className="header__logo">
                        <a href="#" ><img src="resources/images/Titel.png" alt="logo" /></a>
                    </div>
                    <div className="header__icons">
                        <a href="#"><img src="resources/images/flag.png" alt="flag" /><img src="resources/images/icons/arrow_white.png" alt="arrow" /></a>
                    </div>
                </div>
                <div className="header__content js-ham-content">
                    <div className="header__head">
                        <div className="js-ham-close"><span className="icon-home"></span></div>
                    </div>
                </div>
            </nav> */}
        </header>
    );
}

export default header;