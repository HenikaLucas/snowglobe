import React from 'react';
import GLOBAL_CONFIG from '../../../config/config';
import Aux from '../../../hoc/Auxiliare';
import parse from 'html-react-parser';
import { NavLink } from 'react-router-dom';
import { timeStamp } from '../../../modules/helpers';
import appGoogleTracking from '../../../modules/googletracking';
/*
	Contains the step that a user must do to participate in the campaign
*/

const StepContent = (props) => {

	let { title } = props,
		contenStep = null,
		promotionCampaign = window.PROMOTION_CAMPAIGN;
	const { t } = props;

	if (promotionCampaign === 'muller') {
		if (window.location.pathname.toLowerCase() === GLOBAL_CONFIG.Route.home.toLowerCase()) {
			contenStep = (
				<Aux>
					<h2>{title}</h2>
	
					<div className="s-content-steps__step first">
						<picture>
							<img src="/resources/images/muller/steps-01.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy first">
							<p>
								2 Milka Produkte bei <strong>Müller</strong><br /> in einem Kaufakt kaufen
							</p>
						</div>
					</div>
	
					<div className="s-content-steps__step second">
						<picture>
							<img src="/resources/images/muller/steps-02.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy second">
							<p>		
								<strong>Kaufbeleg</strong><br /> bis zum 16.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen
							</p>
						</div>
					</div>
	
					<div className="s-content-steps__step third">
						<picture>
							<img src="/resources/images/muller/steps-03.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy third">
							<p>
								Täglich einen CEWE Gutschein <br /> für eine personalisierte XL <strong>Foto-Postkarte inkl. Versand</strong> gewinnen
							</p>
						</div>
					</div>
				</Aux>
			);
		}else{
			contenStep = (
				<Aux>
					<h2>{title}</h2>
	
					<div className="s-content-steps__step first">
						<picture>
							<img src="/resources/images/muller/steps-01.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy first">
							<p >
								2 Milka Produkte bei <strong>Müller</strong><br /> in einem Kaufakt kaufen
							</p>
						</div>
					</div>
	
					<div className="s-content-steps__step second">
						<picture>
							<img src="/resources/images/muller/steps-02.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy second">
							<p >		
								<strong>Kaufbeleg</strong><br /> bis zum 16.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen
							</p>
						</div>
					</div>
	
					<div className="s-content-steps__step third">
						<picture>
							<img src="/resources/images/muller/steps-03.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy third">
							<p >
								Täglich <strong>einen Gutschein</strong> von CEWE für eine persönliche <strong>Foto-Postkarte inkl. Versand</strong> gewinnen
							</p>
						</div>
					</div>
				</Aux>
			);
		}
	} else if (promotionCampaign === 'rewe') {
		if (window.location.pathname.toLowerCase() === GLOBAL_CONFIG.Route.home.toLowerCase()) {
			contenStep = (
				<Aux>
					<h2>{title}</h2>

					<div className="s-content-steps__step first">
						<picture>
							<source srcSet="/resources/images/rewe/steps-01.png" media="(min-width: 1024px)" />
							<source srcSet="/resources/images/rewe/steps-01.png" media="(min-width: 481px)" />
							<source srcSet="/resources/images/rewe/steps-01.png" media="(min-width: 200px)" />
							<img src="/resources/images/rewe/steps-01.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy first">
							<p >
								3x Milka Produkte bei <strong>REWE</strong> in einem Kaufakt kaufen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step second">
						<picture>
							<source srcSet="/resources/images/rewe/steps-02.png" media="(min-width: 1024px)" />
							<source srcSet="/resources/images/rewe/steps-02.png" media="(min-width: 481px)" />
							<source srcSet="/resources/images/rewe/steps-02.png" media="(min-width: 200px)" />
							<img src="/resources/images/rewe/steps-02.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy second">
							<p >
								<strong>Kaufbeleg</strong><br /> bis zum 16.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochgeladen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step third">
						<picture>
							<source srcSet="/resources/images/rewe/steps-03-mobile.png" media="(max-width: 1229px)" />
							<img src="/resources/images/rewe/steps-03.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy third">
							<p >Wöchentlich 1 von 100 <strong>REWE Gutscheinen</strong> <br /> im Wert von 50€ gewinnen</p>
						</div>
					</div>

					<div className="s-content-steps__step fourth">
						<picture>
							<source srcSet="/resources/images/rewe/steps-04.png" media="(min-width: 1024px)" />
							<source srcSet="/resources/images/rewe/steps-04.png" media="(min-width: 481px)" />
							<source srcSet="/resources/images/rewe/steps-04.png" media="(min-width: 200px)" />
							<img src="/resources/images/rewe/steps-04.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy fourth">
							<p>
								<strong>Doppelt freuen:</strong> <br /> Pro Gewinner spendet Milka 20€ an Tafel Deutschland e.V.
							</p>
						</div>
					</div>
				</Aux>
			);
		} else {
			contenStep = (
				<Aux>
					<h2>{title}</h2>

					<div className="s-content-steps__step first">
						<picture>
							<source srcSet="/resources/images/rewe/steps-01.png" media="(max-width: 480px)" />
							<img src="/resources/images/rewe/faq-steps-01.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy first">
							<p>
								3x Milka Produkte bei <strong>REWE</strong> in einem Kaufakt kaufen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step second">
						<picture>
							<source srcSet="/resources/images/rewe/steps-02.png" media="(max-width: 480px)" />
							<img src="/resources/images/rewe/faq-steps-02.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy second">
							{/* <picture>
                                <source srcSet="/resources/images/rewe/kassenbonImage.png" media="(min-width: 1024px)" />
                                <source srcSet="/resources/images/rewe/kassenbonImage.png" media="(min-width: 481px)" />
                                <source srcSet="/resources/images/rewe/kassenbonImage.png" media="(min-width: 200px)" />
                                <img src="/resources/images/rewe/kassenbonImage.png" className="s-content-steps__kassenbon" alt="Participation Kassenbon" />
                            </picture> */}
							<p >
								<strong>Kaufbeleg</strong><br /> bis zum 16.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step third">
						<picture>
							<source srcSet="/resources/images/rewe/steps-03-mobile.png" media="(max-width: 480px)" />
							<img src="/resources/images/rewe/faq-steps-03.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy third">
							<p>Wöchentlich 1 von 100 <strong>REWE Gutscheinen</strong> <br /> im Wert von 50€ gewinnen</p>
						</div>
					</div>

					<div className="s-content-steps__step fourth">
						<picture>
							<source srcSet="/resources/images/rewe/steps-04.png" media="(max-width: 480px)" />
							<img src="/resources/images/rewe/faq-steps-04.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy fourth">
							<p>
								<strong>Doppelt freuen:</strong> <br /> Pro Gewinner spendet Milka 20€ an Tafel Deutschland e.V.
							</p>
						</div>
					</div>
				</Aux>
			);
		}

	} else if (promotionCampaign === 'kaufland') {
		if (window.location.pathname === GLOBAL_CONFIG.Route.home) {
			contenStep = (
				<Aux>
					<h2>{title}</h2>
	
					<div className="s-content-steps__step first">
						<picture>
							<img src="/resources/images/kaufland/step-1.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy first">
							<p>
								5x Milka bei<br /> <strong>Kaufland</strong> in einem Kaufakt kaufen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step second">
						<picture>
							<img src="/resources/images/kaufland/step-2.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy second">
							<p>		
								<strong>Kaufbeleg</strong> <br /> bis zum 16.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step third">
						<picture>
							<img src="/resources/images/kaufland/step-3.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy third">
							<p>
								Täglich 1 von 10 <strong>Kaufland Gutscheinen</strong> im Wert von max. 200€ gewinnen 
							</p>
						</div>
					</div>
				</Aux>
			);
		} else if (window.location.pathname === GLOBAL_CONFIG.Route.participation) {
			contenStep = (
				<Aux>
					<div className="s-content-steps">
						<h2>{title}</h2>
						<div className="s-content-steps__item kaufland">
							<div className="s-content-steps__item-image">
								<img src="/resources/images/kaufland/step-1.png" width="239" height="214" alt="Step 1" />
							</div>
							<p className="first">5x Milka bei <strong>Kaufland</strong> in einem Kaufakt kaufen</p>
						</div>
						<div className="s-content-steps__item kaufland">
							<div className="s-content-steps__item-image">
								<img src="/resources/images/kaufland/step-2.png" width="217" height="195" alt="Step 2" />
							</div>
							<p><strong>Kaufbeleg</strong> bis zum 24.12.2021 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen</p>
						</div>
						<div className="s-content-steps__item kaufland">
							<div className="s-content-steps__item-image">
								<img src="/resources/images/kaufland/step-3.png" width="217" height="195" alt="Step 2" />
							</div>
							<p>Mit etwas Glück gewinnen</p>
						</div>
					</div>
				</Aux>
			);
		} else if (window.location.pathname === GLOBAL_CONFIG.Route.faq) {
			contenStep = (
				<Aux>
					<div className="s-content-steps__step first">
						<picture>
							<img src="/resources/images/kaufland/step-1.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy first">
							<p>
								5x Milka Produkte bei <strong>Kaufland</strong> <br/> in einem Kaufakt kaufen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step second">
						<picture>
							<img src="/resources/images/kaufland/step-2.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy second">
							<p>		
								<strong>Kaufbeleg</strong> <br /> bis zum 16.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen
							</p>
						</div>
					</div>

					<div className="s-content-steps__step third">
						<picture>
							<img src="/resources/images/kaufland/step-3.png" className="s-content-steps__image" alt="Participation Steps" />
						</picture>
						<div className="s-content-steps__copy third">
							<p>
								Täglich 1 von 10 <strong>Kaufland Gutscheinen</strong> im Wert von max. 200€ gewinnen 
							</p>
						</div>
					</div>
				</Aux>
			);
		}

	} else if (promotionCampaign === 'edeka') {
		contenStep = (
			<Aux>
				<h2>{title}</h2>
		
				<div className="s-content-steps__step first">
					<picture>
						<img src="/resources/images/edeka/step-1.png" className="s-content-steps__image" alt="Participation Steps" />
					</picture>
					<div className="s-content-steps__copy first">
						<p>
							Für 5€ Milka Produkte in einem Kaufakt bei <strong>EDEKA</strong> kaufen
						</p>
					</div>
				</div>

				<div className="s-content-steps__step second">
					<picture>
						<img src="/resources/images/edeka/step-2.png" className="s-content-steps__image" alt="Participation Steps" />
					</picture>
					<div className="s-content-steps__copy second">
						<p>		
						<strong>Kaufbeleg</strong> <br />bis zum 17.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen
						</p>
					</div>
				</div>

				<div className="s-content-steps__step third">
					<picture>
						<img src="/resources/images/edeka/step-3.png" className="s-content-steps__image" alt="Participation Steps" />
					</picture>
					<div className="s-content-steps__copy third">
						<p>
							<strong>Persönliche Baumurkunde</strong> erhalten und zusätzlich im Lostopf für 1 von 3 Baumhaushotel-Gutscheinen <br/> im Wert von je 3000€ von mydays landen 
						</p>
					</div>
				</div>
			</Aux>
		);
	} else if (promotionCampaign === 'netto') {
		contenStep = (
			<Aux>
				<h2>{title}</h2>
		
				<div className="s-content-steps__step first">
					<picture>
						<img src="/resources/images/edeka/step-1.png" className="s-content-steps__image" alt="Participation Steps" />
					</picture>
					<div className="s-content-steps__copy first">
						<p>
							Für 5€ Milka Produkte in einem Kaufakt bei <strong>NETTO</strong> kaufen
						</p>
					</div>
				</div>

				<div className="s-content-steps__step second">
					<picture>
						<img src="/resources/images/edeka/step-2.png" className="s-content-steps__image" alt="Participation Steps" />
					</picture>
					<div className="s-content-steps__copy second">
						<p>		
						<strong>Kaufbeleg</strong> <br />bis zum 17.04.2022 <NavLink to={GLOBAL_CONFIG.Route.participation} exact data-event="button-click" data-category="Click Action" data-action="Participate" data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}><>hier</></NavLink> hochladen
						</p>
					</div>
				</div>

				<div className="s-content-steps__step third">
					<picture>
						<img src="/resources/images/edeka/step-3.png" className="s-content-steps__image" alt="Participation Steps" />
					</picture>
					<div className="s-content-steps__copy third">
						<p>
							<strong>Persönliche Baumurkunde</strong> erhalten und zusätzlich im Lostopf für 1 von 3 Baumhaushotel-Gutscheinen <br/> im Wert von je 3000€ von mydays landen 
						</p>
					</div>
				</div>
			</Aux>
		);
	}
	return (
		<div className="s-content-steps">
			{contenStep}
		</div>
	);
}

export default StepContent;