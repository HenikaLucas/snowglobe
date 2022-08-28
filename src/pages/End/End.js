import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle } from '../../modules/helpers';

class End extends Component {

	constructor(props) {
		super(props)

		// to check if the device is a mobile or not 
		this.state = {
			isMobile: false
		}

		this.resize = this.resize.bind(this);
	}

	componentDidMount() {
		const { t } = this.props;
		//Remove main loader
		mainLoaderToggle('hide');

		//Virtual page
		appGoogleTracking.dataLayerPush({
			'customEvent': {
				'event': 'virtual-page',
				'virtualUri': GLOBAL_CONFIG.Route.end,
				'pageTitle': t('Meta.title')
			}
		});

		window.addEventListener("resize", this.resize);
		this.resize();
	}

	componentWillUnmount() {
		//Show mainloader
		mainLoaderToggle('show');
	}

	resize() {
		// set isMobile to true if the device is a mobile and false otherwise 
		this.setState({ isMobile: window.innerWidth <= 768 });
	}

	render() {

		const { t } = this.props;

		return (
			<div className="s-card-container s-content-end">
				<h1>{parse(t('Page.End.title'))}</h1>

				<div className="s-card-container">
					<div className="s-card">
						<img src={t('Page.End.CardContent1.imgSrc')} alt="" />
						<img src="/resources/images/rewe/platzhalter.png" alt="" className="platzhalter" />
						<div className="s-card__copy">
							<h3>{t('Page.End.CardContent1.title')}</h3>
							<p>{t('Page.End.CardContent1.paragraph')}</p>
							<a href="https://www.fcmilka.de/account" target="_blank">
								<div className="btn__container btn--secondary-lilac btn--hover">
									<span className="btn__text"> {t('Page.End.CardContent1.button.text')} </span>
								</div>
							</a>
						</div>
					</div>

					<div className="s-card">
						<img src={t('Page.End.CardContent2.imgSrc')} alt="" />
						<div className="s-card__copy">
							<h3>{t('Page.End.CardContent2.title')}</h3>
							<p>{t('Page.End.CardContent2.paragraph')}</p>
							<a href="https://www.fcmilka.de/account" target="_blank">
								<div className="btn__container btn--secondary-lilac btn--hover">
									<span className="btn__text"> {t('Page.End.CardContent2.button.text')} </span>
								</div>
							</a>
						</div>
					</div>

					<div className="s-card">
						<img src={t('Page.End.CardContent3.imgSrc')} alt="" />
						<div className="s-card__copy">
							<h3>{t('Page.End.CardContent3.title')}</h3>
							<p>{t('Page.End.CardContent3.paragraph')}</p>
							<a href="https://www.fcmilka.de/account" target="_blank">
								<div className="btn__container btn--secondary-lilac btn--hover">
									<span className="btn__text"> {t('Page.End.CardContent3.button.text')} </span>
								</div>
							</a>
						</div>
					</div>
				</div>	
			</div>
		);
	}

}

export default withTranslation()(End);