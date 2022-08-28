import React from 'react';
import CampaignServices from '../../../Services/Campaign';

import Checkbox from "../../Controls/Checkbox";

class footernewsletter extends React.Component {

    constructor() {
        super();

        this.state = {
            EmailError: false,
            ErrorConsent: "",
            newsletterCheck: false,
            SimpleLoader : false
        }
        this.EmaiValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,17}$/
    }

    render() {
        return(
            <div className="grid-9-m grid-m-12 grid-s-2-m footer__newsletter">
                <form className="js-footer-subscribe footer__form js-form-no-action" onSubmit={this.Subscribe.bind(this)}>
                    <div className="grid-4-m grid-m-4 grid-s-2-m partial-container__input">
                        <h4 className="footer__title">
                            IMMER AUF DEM NEUESTEN STAND MIT DEM MILKA NEWSLETTER <br />
                            Milka Newsletter <a href="https://www.milka.de/newsletter-abbestellen">hier</a> abbestellen.
                        </h4>
                        <div className="composition__container">
                            <input className="composition__input"
                                ref={ input => this.email = input } 
                                type="text" 
                                placeholder="E-Mail-Adresse" 
                                data-sc-field-name="Mail" 
                                data-val-required="true" 
                                onBlur={this.CheckValidEmail.bind(this)}
                            />
                            {
                                this.state.EmailError ?
                                <span className="field-validation-valid form-input__error" style={{ display: "block"}}>Enthält ungültige Emailadresse.</span>
                                : null
                            }
                            <input className="composition__btn" type="submit" value="Abonnieren" />
                        </div>
                    </div>
                    <div className={`grid-8-m grid-m-8 grid-s-2-m partial-container__checkbox ${this.state.ErrorConsent}`}>
                        <Checkbox
                            id="newsletterCheck"
                            name="newsletterCheck"
                            text="Ich möchte den regelmäßigen Newsletter mit Informationen zu Milka Produkten, Rezepten und Aktionen per E-Mail von der Mondelez Deutschland Services GmbH &amp; Co. KG oder von verbundenen Unternehmen der Mondelez International Unternehmensgruppe erhalten. In diesem Zusammenhang wird auch mein Kauf- und Klickverhalten auf dieser Milka-Website analysiert. Diese Einwilligung kann jederzeit mit zukünftiger Wirkung <a target='_blank' rel='noopener noreferrer' classname='js-event-cta' data-event='Info-click' data-category='Informational Action' data-action='Footer Link' data-label='hier' href='https://www.milka.de/newsletter-abbestellen'>hier</a> widerrufen werden. Bitte beachten Sie auch unsere <a target='_blank' rel='noopener noreferrer' href='https://eu.mondelezinternational.com/privacy-notice?sc_lang=de-de&amp;siteID=7GTws0jSEtgtqGQHH57lZw%3D%3D'>Datenschutzerklärung</a> für weitere Informationen."
                            onChangeHandler={ this.CheckboxChangeHandler.bind(this) }
                            isForFooter={true}
                        />
                    </div>
                </form>
                {
                    this.state.SimpleLoader ? 
                        <div className="simple-loader__container active">
                            <div className="simple-loader__indicator"></div>
                        </div>
                    : null
                }
            </div>
        );
    }

    CheckValidEmail(){
        let emailValue = this.email.value,
            emailValid = this.EmaiValidation.test(emailValue);
        if(!emailValid){
            this.setState({
                EmailError : true
            })
        }else{
            this.setState({
                EmailError : false
            })
        }
    }

    CheckboxChangeHandler(event, _ref) {
        this.setState({
            [_ref.getAttribute("id")]: _ref.checked,
            ErrorConsent: _ref.checked ? "" : "error"
        })
    }

    Subscribe(event) {
        event.preventDefault();
        let emailValue = this.email.value,
            emailValid = this.EmaiValidation.test(emailValue),
            consentValid = this.state.newsletterCheck;

        if(!emailValid) {
            this.setState({
                EmailError: true
            })
        }

        if(!consentValid) {
            this.setState({
                ErrorConsent: "error"
            })
        }

        if(emailValid && consentValid) {
            /**
             * Proceed with subscription
             */
            this.setState({
                EmailError: false,
                ErrorConsent: "",
                SimpleLoader : true
            })

            const _data = {
                Email: this.email.value, 
                newsletterCheck: 1,
                Privacy: 1, 
                Sub: 1
            }

            CampaignServices.SupportingProfile( _data )
            .then( (response) => {
                let { status, success, data } = response.data;

                this.setState({
                    SimpleLoader: false
                })

                if(success) {
                    console.log("OK mail")
                } else {
                    console.log("KO mail")
                }
            })
            .catch( () => {
                this.setState({
                    SimpleLoader: false
                })
                console.log("catch KO mail")
            })
        }
    }

}


export default footernewsletter;