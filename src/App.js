import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';							//Router component for React
import TagManager from 'react-gtm-module';									//GTM tag manager plugin
import GLOBAL_CONFIG from './config/config';								//Global Settings that contains URL etc
import Layout from './layout/Layout';							//Layout master component that includes : header, main, footer
import StickyHeader from './modules/stickyheader';							//Sticky header modules
import HamburgerMenu from './modules/hamburger-menu';						//Hamburegr menu mobile devices
import Scrolltop from './modules/scrolltop';								//Back to top Arrow on footer
import FooterAccordion from './modules/footeraccordion';					//Accordion on footer menu on mobile devices
import { campaignSettings } from './modules/helpers';			//Helpers for Service path

import { I18nextProvider } from "react-i18next";
import i18next from './modules/localisation';

import './styles/CONFIG/global.scss';						//Main CSS for all the pages
import CampaignServices from './Services/Campaign';

//Process to get main settings for the site
const PROMOTION_SETTINGS = campaignSettings(GLOBAL_CONFIG);

//Global variables
window.PROMOTION_CAMPAIGN = PROMOTION_SETTINGS.campaignStatus;		//Set promotion campaign : rewe, kaufland or muller
window.GOOGLE_SITEKEY 	  = PROMOTION_SETTINGS.siteKey;				//Sitekey for google recaptcha
window.FILE_STATUS 		  = GLOBAL_CONFIG.Settings.fileStatus;		//Use on particpation page
window.INNER_LINK 		  = GLOBAL_CONFIG.Settings.innerLink;
window.PAGE_SECTION 	  = '';
window.PROMOTION 		  = null;									//Set global variable for promotion : main, holding, end
window.PARTICIPATION_ID   = null;

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			campaign: 			GLOBAL_CONFIG.Settings.campaign,			//True or false
			campaignStatus: 	GLOBAL_CONFIG.Settings.campaignStatus,		//main, holding, end
			localDev: 			GLOBAL_CONFIG.Settings.localDev,			//Need to be false on staging and prod
			localDomain: 		GLOBAL_CONFIG.Settings.localDomain,			//Local domain : 3000 or 5000
			promotionCampaign:  PROMOTION_SETTINGS.campaignStatus			//Set promotional campaign : rewe, kaufland or muller
		}

		//GTM settings
		if(GLOBAL_CONFIG.GTM.gtmTag === true){ 
			TagManager.initialize({
				gtmId: PROMOTION_SETTINGS.gtmID
			});
		}
	}

	/* 
		This include actual script for initialization of :
		Sticky header (desktop and menu)
		Hamburger Menu
		Footer Scroll up
		Accordion
	*/
	domLoadModules(){
		new StickyHeader({
			headerSelector: '.js-header.header-md__container',
			contentSelector: '.js-header-md-content',
			iconSelector: '.js-header-md-hamburger',
			linkSelector: '.header-md__navigation'
		});

		new StickyHeader({
			headerSelector: '.js-header.header__container .header__head',
			linkSelector: '.header__navigation'
		});

		new HamburgerMenu({
			menuSelector: '.js-hamburger',
			contentSelector: '.js-ham-content',
			modifier: 'header__menu--open',
			close: '.js-ham-close'
		});

		new Scrolltop({
			selector: '.js-scroll-top',
			heightActive: 600
		});

		new FooterAccordion();
	}
 
	//Simulation for local development
	localCampaignSimulation = () => {
		if(this.state.localDev === true && window.location.host.indexOf(this.state.localDomain) > -1){
			//Set campaign state
			this.setState({
				campaign: 		GLOBAL_CONFIG.Settings.campaign,
				campaignStatus: GLOBAL_CONFIG.Settings.campaignStatus		//main, holding, end  :  manual change
			});

			window.PROMOTION = GLOBAL_CONFIG.Settings.campaignStatus;
		}
	}

	//Function to load promotional campaign
	//On each page load this function execute to get the promotional campaign status : main, holding or end
	loadCampaign = () => {		
		//Ajax call to get the promotional state
		CampaignServices.Status({retailer: this.state.promotionCampaign})
		.then((response) => {

			if(response.status === 200 || response.status === 201){

				if(response.data.Success === true){
					window.PROMOTION = response.data.Status;	//Get promotional state : main, holding or end

					//Set campaign state
					this.setState({
						campaign: true,
						campaignStatus: response.data.Status
					});

					//Set winner display behaviour - placeholder to know what to display on thank you page
					//Value DEFAULT, BANNER_ONE and BANNER_TWO
					sessionStorage.setItem(GLOBAL_CONFIG.Session.campaignPlaceholder, response.data.placeholder);		
				} else {
					console.log('Error in response');
				}
			} else {
				console.log('Error in response - 2');
			}
		})
		.catch((response) => {
			//Error 
			console.log('Error in response - 3',response);
		});
		
		//Simulate local environment
		this.localCampaignSimulation();
	}

	componentWillMount() { 
		//Load promotion : main, holding, end
		this.loadCampaign();
	}

	componentDidMount(){
		//Load dom modules
		window.addEventListener('DOMContentLoaded', this.domLoadModules); 
	}

	render() {
		/* 
			<BrowserRouter> is needed for using Route for the pages
			<I18nextProvider> is use for the json management
			<Suspense> is use for async loading of the json
		*/
		return (
			<Suspense fallback="loading...">
				<I18nextProvider i18n={i18next}>
					<BrowserRouter>
						<Layout campaign={this.state.campaign} campaignStatus={this.state.campaignStatus} promotionCampaign={PROMOTION_SETTINGS.campaignStatus} />
					</BrowserRouter>
				</I18nextProvider>
			</Suspense>
		);
	}
}

export default App;
