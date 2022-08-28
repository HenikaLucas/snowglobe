import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';
import GLOBAL_CONFIG from '../../config/config';
import TitleContent from '../../components/Content/TitleContent/TitleContent';
import GiftContent from '../../components/Content/GiftContent/GiftContent';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle } from '../../modules/helpers';
import { withCookies } from 'react-cookie';
import ValidateForm from '../../modules/validate';  
import CampaignServices from '../../Services/Campaign';

class Holding extends Component {
    constructor(props){
        super(props)

        // to check if the device is a mobile or not 
        this.state = {
            isMobile: false,
            isEmailSent : false,
            loaderSubmit : false
        }

        this.displayFormSection.bind(this);
        this.processForm.bind(this);
        
    }

    componentDidMount(){
        const { t } = this.props;
        //Remove main loader
        mainLoaderToggle('hide');

         //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.holding,
                'pageTitle': t('Meta.title')
            }
        });

        
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        const { cookies } = this.props;
        if (cookies.get("_isPress") == "true") {
            this.setState({ isEmailSent: true });
        }
    }

    componentWillUnmount() {
        mainLoaderToggle('show');
    }

    resize() {
        // set isMobile to true if the device is a mobile and false otherwise 
        this.setState({isMobile: window.innerWidth <= 768});
    }

    
    displayFormSection(){
        return (
            <div className='form-holding'>
                <form 
                    id="frm_holding" 
                    name="frm_holding" 
                    method="post" 
                    action="/" 
                    ref={form => this._FORM = form}
                    onSubmit={this.onSubmitHandler.bind(this)} noValidate>
                        <h3>
                            Du möchtest den Start der Verlosung auf keinen Fall verpassen? Wir erinnern dich rechtzeitig per E-Mail!
                        </h3>
                        <div id="email" className="input-container">
                            <div className="form-input__container">
                                {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Label}</label> */}
                                <input className="form-input__input js-event-type-in js-event-ab" 
                                    type="email"
                                    placeholder="E-Mail-Adresse eingeben" 
                                    data-require="true"
                                    data-type="regex" 
                                    data-error-target="#error-email"
                                    data-regex-pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,17}$" 
                                    data-required-message=""
                                    data-pattern-message="Huch – da hat sich wohl ein Fehler in die E-Mail-Adresse eingeschlichen. Bitte überprüfe deine E-Mail-Anschrift." 
                                    data-event-fieldname="Email" 
                                    data-event="form-click" 
                                    data-category="Form Action" 
                                    data-action="Email" 
                                    data-label="Type In" 
                                    ref = { input => this._EMAIL = input }
                                />
                                <span id="error-email" className="form-input__error active"></span>
                            </div>
                        </div>

                        {
                            !this.state.isEmailSent ? 
                                (
                                    <div id="checkbox" className="input-container">
                                        <label className="custom-inputs" htmlFor="newsletter">
                                            <span className="text-content">
                                                Ich möchte den regelmäßigen Newsletter mit Informationen zu Milka Produkten,
                                                Rezepten und Aktionen per E-Mail von der Mondelez Deutschland Services GmbH &
                                                Co. KG oder von verbundenen Unternehmen der Mondelez International
                                                Unternehmensgruppe erhalten. In diesem Zusammenhang wird auch mein Kauf- und
                                                Klickverhalten auf dieser Milka-Website analysiert. Diese Einwilligung kann jederzeit
                                                mit zukünftiger Wirkung <a href="#">hier</a> widerrufen werden. Bitte beachten Sie auch unsere
                                                <a href="https://eu.mondelezinternational.com/privacy-notice?sc_lang=de-de&siteID=7GTws0jSEtgtqGQHH57lZw%3D%3D" target="_blank">Datenschutzerklärung</a> für weitere Informationen.
                                            </span>
                                            <input ref={check => this._CHECKBOX = check } 
                                                type="checkbox" 
                                                id="newsletter" 
                                                name="newsletter" 
                                                className="js-event-type-in js-event-ab" 
                                                data-require="true"
                                                data-type="checkbox"
                                                data-event-fieldname="Newsletter" 
                                                data-event="form-click" 
                                                data-category="Form Action" 
                                                data-action="Newsletter" 
                                                data-label="Type In" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                )
                            :
                                (
                                    <p className="email-sent">
                                        Deine E-Mail-Adresse wurde erfolgreich gespeichert. Wir erinnern dich, sobald die Milka Osteraktion beginnt.
                                    </p>
                                )
                        }
                        

                        <button type={ this.state.isEmailSent ? "button" : "submit" } className={ this.state.isEmailSent ? "btn__container btn--primary disabled" : "btn__container btn--primary " }>
                            ERINNERE MICH
                        </button>
                </form>
            </div>
        );
    }

    onSubmitHandler(event){
        event.preventDefault();
        if (this.state.isEmailSent) {
            return null;
        }

        const validateForm = ValidateForm.validateForm('frm_holding');
        if(validateForm){
            this.processForm();
        }else{
            /**
             * Scroll To first error
             */
            let firstError = this._FORM.querySelector(".notvalid");
            if (!!firstError) {
                const yOffset = - 110,
                    y = firstError.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        }
    }

    processForm() {
        const { cookies } = this.props;
        let _data = {
            email: this._EMAIL.value
        }
        this.setState({loaderSubmit : true});

        CampaignServices.NewsletterSubscribe({retailer: window.PROMOTION_CAMPAIGN, data :_data})
            .then((response) => {
                let { Success } = response.data;
                console.log(response);
                this.setState({loaderSubmit : false});
                if (Success) {
                    this.setState({ isEmailSent: true });
                    const expireDate = new Date();
                    expireDate.setMonth(expireDate.getMonth() + 3);
                    cookies.set("_isPress", "true", { path: "/", expires: expireDate });
                } else {
                    console.log("KO");
                }
            })
            .catch(() => {
                this.setState({loaderSubmit : false});
                console.log("catch : KO");
            });
    }


    render() {

        const { t } = this.props;

        let image = {
            desktop: t('Page.Holding.bottomBanner.desktop'),
            mobile: t('Page.Holding.bottomBanner.mobile')
        };

        return (
            <div className="content-holding">
                <TitleContent 
                    heading={t('Page.Holding.title')} 
                    subheading={this.state.isMobile?parse(t('Page.Holding.subTitle.mobile')):parse(t('Page.Holding.subTitle.desktop'))}
                    paragraph={typeof t('Page.Holding.paragraph') === 'string' ? parse(t('Page.Holding.paragraph')):null }
                    subheading2={t('Page.Holding.subTitle2')}
                />

                {
                    this.state.loaderSubmit ? 
                    <div className="simple-loader__container active">
                        <div className="simple-loader__indicator"></div>
                    </div> 
                    : null
                }

                { this.displayFormSection() }

                <div className="content-link">
                    <a href={`https://www.milka.de/`} target="_blank" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="See Prizes" data-label={t('Meta.title')} onClick={appGoogleTracking.processEventCTA}>
                        <div className="btn__container btn--secondary-lilac btn--hover">
                            <span className="btn__text" >{this.state.isMobile ? t('Page.Holding.linkText.mobile'):t('Page.Holding.linkText.desktop')}</span>
                        </div>
                    </a>
                </div>
                <GiftContent imageoption={image} primaryoption={true} classModifier={image.mobile === false ? " no-mobile" : "" } />
            </div>
        );
    }
}

export default withCookies(withTranslation()(Holding));