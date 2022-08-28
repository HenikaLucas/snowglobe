import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import Aux from '../../../hoc/Auxiliare';
import ColumnContent from '../ColumnContent/ColumnContent';
import TitleContent from '../TitleContent/TitleContent';
import parse from 'html-react-parser';
import MeedoenForm from '../MeedoenForm/MeedoenForm';



class MeedoenContent extends Component {

	render() {
		const { t } = this.props;
		return (
            <Aux>
            <div className='meedoen-wrapper'  id='meedoen'>
                        <picture>
                            <source srcSet={t('Page.Meedoen.section2.bg.desktop')} media="(min-width: 1024px)" />
                            <source srcSet={t('Page.Meedoen.section2.bg.mobile')} media="(max-width: 481px)" />
                            {/* <source srcSet={t('Page.Meedoen.section2.bg.mobile')} media="(min-width: 200px)" /> */}
                            <img className="meedoen-image" src={t('Page.Meedoen.section2.bg.desktop')} alt="background" />
                        </picture>
                        <div className="meedoen-contents">
                        <MeedoenForm
                            heading={typeof t('Page.Meedoen.section1.title') === "string" ? parse(t('Page.Meedoen.section1.title')) : t('Page.Meedoen.section1.title')}
                            bgDesktop={typeof t('Page.Meedoen.section1.bg.desktop') === "string" ? parse(t('Page.Meedoen.section1.bg.desktop')) : t('Page.Meedoen.section1.bg.desktop')} 
                        />
                        <ColumnContent
							heading={typeof t('Page.Meedoen.section2.title') === "string" ? parse(t('Page.Meedoen.section2.title')) : t('Page.Meedoen.section2.title')}
							subheading={typeof t('Page.Meedoen.section2.subheading') === "string" ? parse(t('Page.Meedoen.section2.subheading')) : t('Page.Meedoen.section2.subheading')}
							paragraph={typeof t('Page.Meedoen.section2.paragraph') === "string" ? parse(t('Page.Meedoen.section2.paragraph')) : t('Page.Meedoen.section2.paragraph')}
							subheading2={typeof t('Page.Meedoen.section2.subheading2') === "string" ? parse(t('Page.Meedoen.section2.subheading2')) : t('Page.Meedoen.section2.subheading2')}
							paragraph2={typeof t('Page.Meedoen.section2.paragraph') === "string" ? parse(t('Page.Meedoen.section2.paragraph')) : t('Page.Meedoen.section2.paragraph')}
						/>
                        </div>
                    </div>
            </Aux>
		);
	}
}

export default withTranslation()(MeedoenContent);

