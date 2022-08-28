import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';
import Aux from '../../hoc/Auxiliare';
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import TitleContent from '../../components/Content/TitleContent/TitleContent';
import MeedoenContent from '../../components/Content/MeedoenContent/MeedoenContent';
import GiftContent from '../../components/Content/GiftContent/GiftContent';
import GiftContentFooter from '../../components/Content/GiftContent/GiftContentFooter';
import SliderContent from '../../components/Content/SliderContent/SliderContent';
import { mainLoaderToggle, timeStamp } from '../../modules/helpers';
import StepContent from '../../components/Content/StepContent/StepContent';

class Home extends Component {

	componentDidMount() {
		const { t } = this.props;
		//Remove main loader
		mainLoaderToggle('hide');

		//Virtual page
		appGoogleTracking.dataLayerPush({
			'customEvent': {
				'event': 'virtual-page',
				'virtualUri': GLOBAL_CONFIG.Route.home,
				'pageTitle': t('Meta.title')
			}
		});
	}

	componentWillUnmount() {
		//Show mainloader
		mainLoaderToggle('show');
	}

	render() {
		const { t } = this.props;
		return (
			<Aux>
				<div className='home-wrapper' id='uitleg'>
					<picture>
						<source srcSet={t('Page.Home.bg.desktop')} media="(min-width: 1024px)" />
						<source srcSet={t('Page.Home.bg.mobile')} media="(max-width: 481px)" />
						{/* <source srcSet={t('Page.Home.bg.mobile')} media="(min-width: 200px)" /> */}
						<img className="home-image" src={t('Page.Home.bg.desktop')} alt="background" />
					</picture>
					<div className="home-contents" >
						<TitleContent
							heading={typeof t('Page.Home.title') === "string" ? parse(t('Page.Home.title')) : t('Page.Home.title')}
							subheading={typeof t('Page.Home.subTitle') === "string" ? parse(t('Page.Home.subTitle')) : t('Page.Home.subTitle')}
							paragraph={typeof t('Page.Home.paragraph') === "string" ? parse(t('Page.Home.paragraph')) : t('Page.Home.paragraph')}
							content={typeof t('Page.Home.content') === "string" ? parse(t('Page.Home.content')) : t('Page.Home.content')}
						/>
					</div>
				</div>
				<MeedoenContent />
			</Aux>
		);
	}
}

export default withTranslation()(Home);
