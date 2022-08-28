import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';                                              //Parse HTML data from string
import ReCaptcha from 'react-google-invisible-recaptcha';                           //Google Recaptcha
import flatpickr from "flatpickr";                                                  //Date Picker
import Aux from '../../hoc/Auxiliare';              
import GLOBAL_CONFIG from '../../config/config';
import ValidateForm from '../../modules/validate';                                  //Form validation module
import appGoogleTracking from '../../modules/googletracking';                       //Google tracking module
import { mainLoaderToggle, navParticipationMenu, timeStamp, optionListConstruct, dateConfig } from '../../modules/helpers'; 
import TitleContent from '../../components/Content/TitleContent/TitleContent';
import StepContent from '../../components/Content/StepContent/StepContent';
import GiftContentFooter from '../../components/Content/GiftContent/GiftContentFooter';
import GiftContent from '../../components/Content/GiftContent/GiftContent';

//CSS import for Datepicker
import 'flatpickr/dist/flatpickr.css'; 
import CampaignServices from '../../Services/Campaign';
import _LOCAL_CAPTCHA from '../../Models/Captcha';
import _MATH from '../../modules/Math';

//Google Recaptcha reference
//const recaptchaRef = React.createRef();

// window.PROMOTION_CAMPAIGN

class Participation extends Component {

    constructor(props) {
        super(props);

        this.handleUnload = this.handleUnload.bind(this);       //Binding to check for Abondanment form for Google tracking

        var limit = new Date();
        limit.setFullYear(limit.getFullYear() - 18);
        this.maxDOB = limit;
        this.DateFormat = 'd.m.Y';
        this.errorMessage = "Ein Fehler ist aufgetreten. Bitte versuchen <br />Sie es später noch einmal.";
        this.DefaultSum = "xx";
        this.ReceiptSymbol = "€";

        this.state = {
            minDate: dateConfig({
                promotion: window.PROMOTION_CAMPAIGN,       //Minimum Purchase date
                status: 'min',
                ...GLOBAL_CONFIG.Date
            }),                    
            maxDate: this.getMaxDate(),
            ReceiptSum: this.DefaultSum,
            IsAdventCalendar: false,
            genericErrorMessage: "",
            CodeIsValid: true,
            MoreTerms: false,
            loaderSubmit: false,
            loaderError: false,
            loaderGeneralError: false,
            promotionCampaign: window.PROMOTION_CAMPAIGN,
            isMobile: false,
            IsProductAmountInvalid : false
        };

        this.DisplayRecieptForm = this.DisplayRecieptForm.bind(this);
        this.DisplaySteps = this.DisplaySteps.bind(this);
        this.DisplayParticipationDetails = this.DisplayParticipationDetails.bind(this);
        this.DisplayReweSpecific = this.DisplayReweSpecific.bind(this);
        this.DisplayDateAndProductCount = this.DisplayDateAndProductCount.bind(this);
        this.ProcessError = this.ProcessError.bind(this);
        this.ProcessFormData = this.ProcessFormData.bind(this);
        this.TriggerCaptcha = this.TriggerCaptcha.bind(this);
        this.resize = this.resize.bind(this);
        this.checkProductAmount = this.checkProductAmount.bind(this);
        this.checkMinValueOfProductAmount = this.checkMinValueOfProductAmount.bind(this);
    }

    resize() {
        // set isMobile to true if the device is a mobile and false otherwise 
        this.setState({isMobile: window.innerWidth <= 768});
    }

    getMaxDate(){
        var maxDate = dateConfig({
            promotion: window.PROMOTION_CAMPAIGN,       //Maximum Purchase date
            status: 'max',
            ...GLOBAL_CONFIG.Date
        });

        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        return `${day}.${month}.${year}`;
    }

    componentDidMount(){
        const { t } = this.props; 
        //Remove main loader
        mainLoaderToggle('hide');

        //Menu navigation active 
        navParticipationMenu(true);

        //Date picker for purchase receipt date
        if(!!this._RECEIPT_ReceiptDate) {
            flatpickr(this._RECEIPT_ReceiptDate,{
                dateFormat: this.DateFormat,
                minDate: this.state.minDate,
                maxDate: this.state.maxDate,
                disableMobile: true
            });
        }

        //Assign Validation function
        ValidateForm.validateField('frm_participation');    //parameter : form id

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.participation,
                'pageTitle': t('Meta.title')
            }
        });

        //Tagging for Form Type in and abondonment form
        appGoogleTracking.formHandlers({
            abandonStatus: true,
            typeInSelector: '.js-event-type-in',
            formID: 'frm_participation',
            abSelector: '.js-event-ab',
            abPrefillSelector: '.js-event-ab-prefilled'
        });

        window.addEventListener('beforeunload', this.handleUnload);
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload);

        //Show mainloader
        mainLoaderToggle('show');
    }

    //Render of the HTML
    render() {
        const { t } = this.props;  
        let image = {
            desktop: t('Page.Holding.bottomBanner.desktop'),
            mobile: t('Page.Holding.bottomBanner.mobile')
        };
        return (
            <Aux>
                <div className="content-home content-participation">
                    <TitleContent 
                        heading={ this.state.isMobile ? parse(t('Page.Participation.title.mobile')) : parse(t('Page.Participation.title.desktop'))}
                        subheading={parse(t('Page.Participation.subTitle'))}
                    />
                </div>
                {this.DisplaySpecificParticipationImage(t)}
            
                {/* <StepContent title={t('Page.Participation.stepsTitle')} t={t}/> */}

                { this.DisplaySteps(t) }

                { this.DisplayParticipationDetails(t) }
                
                <GiftContent imageoption={image} primaryoption={true} classModifier={image.mobile === false ? " no-mobile" : "" } />

                <div className="content-participation-footer">
                    <GiftContentFooter btnShow={false} hrShow={false} />
                </div>

                {
                    this.state.loaderSubmit ? 
                    <div className="simple-loader__container active">
                        <div className="simple-loader__indicator"></div>
                    </div> 
                    : null
                }
                {
                    this.state.loaderError ?
                    <div className="js-overlay overlay overlay--black">
                        <div className="overlay__container overlay__content">
                            <div className="overlay__close" onClick={this.onClosePopupHandler}></div>
                            <p className="overlay__title">Du hast bereits 3x an der Aktion teilgenommen.</p>
                            <p id="js-error-msg">Über den gesamten Gewinnspielzeitraum ist eine dreimalige Teilnahme mit jeweils neuem gültigem Kassenbon erlaubt. Eine weitere Teilnahme ist leider nicht möglich.</p>
                            <div className="overlay__footer">
                                <p>Du möchtest wissen, welche Neuigkeiten es bei Milka gibt?</p>
                                <a href="https://www.milka.de/neues" target="_blank" rel="noopener noreferrer">
                                    <div class="btn__container btn--primary btn--hover">
                                        <span class="btn__text">NEUES VON MILKA</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div> : null
                }
                {
                    this.state.loaderGeneralError ?
                    <div className="js-overlay overlay overlay--black">
                        <div className="overlay__container overlay__content">
                            <div className="overlay__close" onClick={this.onClosePopupHandler}></div>
                            <p id="js-error-msg">{parse(this.state.genericErrorMessage)}</p>
                        </div>
                    </div> : null
                }
            </Aux>
        );
    }

    DisplaySpecificParticipationImage(t){
        if(window.PROMOTION_CAMPAIGN != "edeka" && window.PROMOTION_CAMPAIGN != "netto"){
            return null;
        }

        let imageSpecific = {
            desktop: t('Page.Participation.specificImage.desktop'),
            mobile: t('Page.Participation.specificImage.mobile')
        };
        
        return (
            <div className={`participation-image__specific`}>
                <picture>
                    <source srcSet={imageSpecific.desktop} media="(min-width: 1024px)" />
                    <source srcSet={imageSpecific.desktop} media="(min-width: 481px)" />
                    <source srcSet={imageSpecific.mobile} media="(min-width: 200px)" />
                    <img src={imageSpecific.desktop} alt="Milka Christmas product" />
                </picture>
            </div>
        )
    }

    DisplaySteps(t) {
        return (
            <div className="content-gift-wrapper">
                <div className="content-list-wrapper">
                    <div className="campaign-description-container">
                        <h3>{this.state.isMobile?parse(t("Page.Participation.description.Title.mobile")):parse(t("Page.Participation.description.Title.desktop"))}</h3>
                        <ul>
                            {
                                t("Page.Participation.description.Steps", { returnObjects: true }).map( step => {
                                    return (
                                        <li>
                                            {step.map((element)=>{
                                                if(element.type === "link"){
                                                    return (
                                                        <NavLink to={element.link} exact data-event={element.dataEvent} data-category={element.dataCategory} data-action={element.dataAction} data-label={timeStamp()} onClick={appGoogleTracking.processEventCTANavLink}>
                                                            <>
                                                                {parse(element.text)}
                                                            </>
                                                        </NavLink>
                                                    );
                                                }else{
                                                    return parse(element.text);
                                                }
                                            })}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <p>{parse(t('Page.Participation.description.Caption'))}</p>
                    </div>
                </div>
                <picture>
                    <source srcSet={t('Page.Participation.description.image.desktop')} media="(min-width: 1024px)" />
                    <source srcSet={t('Page.Participation.description.image.desktop')} media="(min-width: 481px)" />
                    <source srcSet={t('Page.Participation.description.image.mobile')} media="(min-width: 200px)" />
                    <img src={t('Page.Participation.description.image.desktop')} alt="Milka Christmas" />
                </picture>
            </div>
        );
    }

    DisplayParticipationDetails(t) {
        //Get Google recaptcha
        let _captcha = _LOCAL_CAPTCHA[this.state.promotionCampaign];
        return (
            <div className="s-content-partication hr">
                <form 
                    id="frm_participation" 
                    name="frm_participation" 
                    method="post" 
                    action="/" 
                    onSubmit={this.onSubmitHandler.bind(this)} noValidate>

                    { this.DisplayRecieptForm(t) }
                    
                    { this.DisplayParticipantForm(t) }

                    <div className="form-container centered">
                        <ReCaptcha
                            ref={ref => this._CAPTCHA = ref}
                            locale={_captcha.lang}
                            sitekey={_captcha.key}
                            onResolved={this.onResolved}
                        />
                    </div>

                    <button type="submit" className="btn__container btn--primary">
                        JETZT MITMACHEN
                    </button>

                    
                </form>
                <div className="container s-content-partication title hr">
                    <h2>{parse(t('Page.Participation.Product.Title'))}</h2>
                    <p>{parse(t('Page.Participation.Product.Description'))}</p>
                    <a href="https://www.milka.de/alle-produkte/weihnachten/" target="_blank" rel="noopener noreferrer" data-event="info-click" data-category="Informational Action" data-action="See Product" data-label={t('Meta.title')} onClick={appGoogleTracking.processEventCTA}>
                        <button className="btn__container btn--secondary-dark">
                            { this.state.isMobile ? t("Page.Participation.Product.CTA.mobile"): t("Page.Participation.Product.CTA.desktop")}
                        </button>
                    </a>
                    {/* <img src={t('Page.Participation.Product.Image')} width="516" height="326" alt="Milka Weihnachtsprodukte entdecken" /> */}
                    
                </div>
            </div>
        );
    }

    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    DisplayDateAndProductCount(t){
        return (
            <>
                <div id="inputs">
                    <div className="form-input__container">
                        {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Id} >{t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Label}</label> */}
                        <input className="form-input__input js-event-type-in js-event-ab" 
                            type={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Type}
                            name={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Id} 
                            id={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Id} 
                            placeholder={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Label} 
                            data-require={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Required}
                            data-type="regex" 
                            data-error-target={`#error-${t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptDate.Id}`} 
                            data-regex-pattern="^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$" 
                            data-required-message="" 
                            data-pattern-message="" 
                            data-event-fieldname="Lastname" 
                            data-event="form-click" 
                            data-category="Form Action" 
                            data-action="Lastname" 
                            data-label="Type In"
                            data-date-min={this.state.minDate}
                            data-date-max={this.state.maxDate}
                            data-date-message=""
                            ref={ input => this._RECEIPT_ReceiptDate = input }
                        />
                    </div>
                    <div className="form-input__container form-input__dropdown">
                        {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ProductAmount.Id} >{t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ProductAmount.Label}</label> */}
                        <select ref={ select => this._RECEIPT_ProductAmount = select} className="form-input__input js-event-type-in js-event-ab" 
                            type="text" name="product-amount" 
                            id="product-amount" 
                            data-require="true" 
                            data-type="ddl" 
                            data-error-target="#error-product-amount"
                            data-required-message=""  
                            data-event-fieldname="Product Amount" 
                            data-event="form-click" 
                            data-category="Form Action" 
                            data-action="Product Amount" 
                            data-label="Type In"
                            data-custom-check={
                                window.PROMOTION_CAMPAIGN === "rewe" && this.state.IsAdventCalendar ?
                                t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.MinValueAdventCalendar", { returnObjects: true }) - 1
                                :
                                t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.MinValue", { returnObjects: true }) - 1
                            }

                            data-custom-message={t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.ErrorMessage")}

                            onChange = {(event)=> {
                                let minValue = t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.MinValue", { returnObjects: true });
                                if(!minValue){
                                    return;
                                }
                                if(window.PROMOTION_CAMPAIGN === "rewe" && this.state.IsAdventCalendar){
                                    minValue = t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.MinValueAdventCalendar", { returnObjects: true });
                                }
                                if(event.target.value < minValue || event.target.value== "default"){
                                    this.setState({IsProductAmountInvalid : true})
                                    event.target.classList.add('notvalid');
                                    event.target.classList.remove('valid');
                                }else {
                                    this.setState({IsProductAmountInvalid : false})
                                    event.target.classList.add('valid');
                                    event.target.classList.remove('notvalid');
                                }
                            }}    
                        >
                            {
                                (t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ProductAmount.Options).map( (amount, index) => {
                                    var { Display, Value } = amount;
                                    return <option value={ Value } key={ `${Value}-${index}`} >{ Display }</option>
                                })
                            }
                        </select>
                    </div>
                    {
                        window.PROMOTION_CAMPAIGN === "kaufland" ?
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Id} >{t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Type}
                                name={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Id} 
                                id={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Label} 
                                data-require={t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Required}
                                data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Field.ReceiptPrice.Id}`} 
                                data-regex-pattern="^[1-9]\d*((\.|\,)\d+)?$" 
                                data-required-message="" 
                                data-pattern-message="" 
                                data-event-fieldname="Sum of Receipt" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Sum of Receipt" 
                                data-label="Type In" 
                                ref={ input => this._RECEIPT_ReceiptPrice = input }
                                onChange={
                                    e => {
                                        if(this._RECEIPT_ReceiptPrice.value.length > 0) {
                                            let receiptSum = _MATH.RoundUp(this._RECEIPT_ReceiptPrice.value.replace(",","."));
                                            if(receiptSum > 200){
                                                receiptSum = 200;
                                            }
                                            this.setState({
                                                ReceiptSum: receiptSum
                                            })
                                        } else {
                                            this.setState({
                                                ReceiptSum: this.DefaultSum
                                            })
                                        }
                                    }
                                }
                            />
                        </div> : null
                    }
                </div>
                {
                    this.state.IsProductAmountInvalid
                    &&
                    (
                        <p className="product-amount-error">
                            { 
                                window.PROMOTION_CAMPAIGN === "rewe" && this.state.IsAdventCalendar  ?
                                    t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.ErrorMessageAdventCalendar")
                                : 
                                    t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.ErrorMessage")
                            }
                        </p>
                    )
                }

                {
                    window.PROMOTION_CAMPAIGN === "kaufland" ?
                    <p className="receipt-sum">
                        Solltest du heute unter den 10 glücklichen Gewinnern sein, gewinnst du einen Kaufland Einkaufsgutschein in Höhe von: 
                        <span> {this.state.ReceiptSum}{this.ReceiptSymbol}</span>
                    </p>: null
                }
            </>
        );
    }
    
    DisplayRecieptForm(t) {
        const campaignName = window.PROMOTION_CAMPAIGN == "muller" ?  "Mueller" : this.capitalizeFirstLetter(window.PROMOTION_CAMPAIGN);

        const messageFileRequired = `Du hast noch keinen Kaufbeleg hochgeladen. Wähle die entsprechende Datei aus und lade deinen ${campaignName}  Kassenbon hoch. Bitte denke dabei daran, die nicht an der Aktion teilnehmenden Artikel auf dem Kassenbon unkenntlich zu machen.`;
        return (
            <div className="campaign-form-receipt">
                <h3>{t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Title}</h3>
                <img src="/resources/images/upload-receipt-imgage.png" width="156" height="173" alt="upload receipt" />
                <label className="btn__container btn--primary btn--hover custom-file-btn" htmlFor="file_to_upload" 
                    onChange={()=>{
                            if(window.PROMOTION_CAMPAIGN=="rewe" && this.state.IsAdventCalendar && this._RECEIPT_file.files.length >= 1){
                                this.state.CodeIsValid = true;
                                this._DETAILS_ProductCode.classList.remove("notvalid");
                            }
                        }
                    }
                > 
                    <span className="desktop-only">{t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).CTA}</span>
                    <input ref={ fileInput => this._RECEIPT_file = fileInput } type="file" id="file_to_upload" name="file_to_upload" data-require="true" data-file-required={window.PROMOTION_CAMPAIGN=="rewe" && this.state.IsAdventCalendar ?  "false" : "true"} data-type="file" data-error-target="#error-file" data-required-message={messageFileRequired} data-oversize-error="Ungültige Dateigröße. Bitte Dateigröße Vorgabe beachten." data-format-error="Ungültiges Dateiformat. Bitte nur gültiges Format hochladen." />
                </label>
                <p className="info-receipt">{t("Page.Participation.Form.Sections.Receipt", { returnObjects: true }).Info}</p>
                <div className="form-container results">
                    <span className="form-input__error js-file-error">Error</span>
                    <span className="form-input__success js-file-success">Success</span>
                </div>
                {this.DisplayDateAndProductCount(t)}
                {this.DisplayWinInfo()}
            </div>
        );
    }

    DisplayWinInfo(t){
        if(window.PROMOTION_CAMPAIGN === "edeka"){
            return (
                <p className="info-win">
                    Wenn alle Teilnahmebedingungen erfüllt sind, erhältst du deine persönliche Baumurkunde und hast zusätzlich die Chance auf  <strong>1 von 3 Baumhaushotel-Gutscheinen im Wert von je 3000€ von mydays.</strong>
                </p>
            );
        }

        if(window.PROMOTION_CAMPAIGN === "rewe"){
            return (
                <p className="info-win">
                   Solltest du diese Woche unter den 100 glücklichen Gewinnern sein, gewinnst du einen REWE Einkaufsgutschein im Wert von 50€.
                </p>
            );
        }

        if(window.PROMOTION_CAMPAIGN === "muller"){
            return (
                <p className="info-win">
                    Solltest du unter den glücklichen Gewinnern sein, gewinnst du einen CEWE Gutschein für eine Postkarte inkl. Versand.    
                </p>
            );
        }

        if(window.PROMOTION_CAMPAIGN === "netto"){
            return (
                <p className="info-win">
                    Wenn alle Teilnahmebedingungen erfüllt sind, erhältst du deine persönliche Baumurkunde und hast zusätzlich die Chance auf <strong>1 von 2 Baumhaushotel-Gutscheinen im Wert von je 3000€ von mydays.</strong>
                </p>
            );
        }
        return null;
    }

    DisplayReweSpecific(t) {
        return (
            <>
                <div id="rewe-specific">
                    <div className="container">
                        <h4>Hast du den Milka & REWE Adventskalender gekauft?</h4>
                        <div className="custom-radio__container">
                            <input className="custom-radio__input" 
                                id="Yes" 
                                name="customisation-choice" 
                                type="radio" 
                                value="yes" 
                                hidden
                                checked={this.state.IsAdventCalendar}
                                />
                            <label onClick={ (event)=>{this.LabelClicked(event, t)}} className="custom-radio__label custom-radio__label_content--option-name" for="Yes">Ja</label>
                        </div>
                        <div className="custom-radio__container">
                            <input className="custom-radio__input" 
                                id="No" 
                                name="customisation-choice" 
                                type="radio" 
                                value="no"
                                hidden
                                checked={!this.state.IsAdventCalendar}
                                />
                            <label onClick={(event)=>{this.LabelClicked(event, t)}} className="custom-radio__label custom-radio__label_content--option-name" for="No">Nein</label>
                        </div>
                        {   
                            this.state.isMobile?null:
                            <img src="/resources/images/rewe/prize-3.png" alt="Special Product" />
                        }

                        {
                            this.state.IsAdventCalendar
                            &&
                            ( 
                                <p>
                                    Solltest du keinen Kassenbon hochgeladen haben, kannst du hier den Produktcode deines Milka & REWE Adventskalenders eingeben um an der Sonderverlosung vom 1.12.-24.12.2021 teilzunehmen. So hast du täglich die Chance auf 1 von 5x 200€ REWE Gutscheinen und zusätzlich spenden wir pro Gewinner 20€ an Tafel Deutschland e.V. 
                                </p>
                            )
                        }
                    
                    </div>
                    {
                        this.state.IsAdventCalendar
                        &&
                        (
                            <div className="campaign-code">
                                <h4>Gib hier den Produktcode deines Adventskalenders ein:</h4>
                                <div className="campaign-code-container">
                                    <picture>
                                        <source srcSet="/resources/images/rewe/code-notice-big.png" media="(min-width: 1024px)" />
                                        <source srcSet="/resources/images/rewe/code-notice-big.png" media="(min-width: 481px)" />
                                        <source srcSet="/resources/images/rewe/code-notice.png" media="(min-width: 200px)" />
                                        <img src="/resources/images/rewe/code-notice.png" alt="Produktcode"/>
                                    </picture>
                                    {/*<p id="info">Der Produktcode besteht aus Zahlen und Buchstaben. (Hinweis: Befindet sich kein Produktcode auf dem Artikel, so müssen die Zahlen beim Barcode eingegeben werden.)</p>*/}
                                    <label>Produktcode-Eingabe</label>
                                    <input className = {this.state.CodeIsValid ? "campaign-code-input" : "campaign-code-input notvalid"}
                                        type = "text"
                                        placeholder = "CWS1218621"
                                        onChange = { () => {
                                            if (this._DETAILS_ProductCode.value.length > 0 || this._RECEIPT_file.files.length >= 1) {
                                                this.setState({
                                                    CodeIsValid: true
                                                })
                                            } else {
                                                this.setState({
                                                    CodeIsValid: false
                                                })
                                            }
                                        } }
                                        ref = { input => this._DETAILS_ProductCode = input }
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    window.PROMOTION_CAMPAIGN == "rewe"
                    &&
                    <div className="campaign-form-receipt">
                        <h3>Angaben zum Kauf</h3>
                        {this.DisplayDateAndProductCount(t)}
                    </div>
                }
            </>
        );
    }

    DisplayParticipantForm(t) {
        const terms2 = t('Page.Participation.Form.Sections.Details.Field.Terms2', {returnObjects: true});
        let terms2Html = null;
        if(terms2 !== null && terms2 !== undefined){
            terms2Html = (
                <div className="input-container">
                    <label className="custom-inputs" htmlFor="terms2">
                        <span className="text-content">
                        {parse(terms2.HTML)} 
                        </span>
                        <input type="checkbox" id="terms2" name="terms2" className="js-event-type-in js-event-ab" data-require="false" data-event-fieldname="Newsletter" data-event="form-click" data-category="Form Action" data-action="Newsletter" data-label="Type In" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            );
        }
        
        return (
            <div className="campaign-form-participation hr">
                <h2>{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Title}</h2>
                <h3>{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Subtitle}</h3>
                <div class="form-container"  id="UserDetails">
                    <p>*Pflichtfelder</p>
                    <div id="salutation" className="input-container">
                        <div className="form-input__container form-input__dropdown">
                            <select ref={ select => this._DETAILS_salutation = select} className="form-input__input js-event-type-in js-event-ab" 
                                type="text" name="salutation" 
                                id="salutation" 
                                data-require="true" 
                                data-type="ddl" 
                                data-error-target="#error-salutation" 
                                data-required-message="" 
                                data-event-fieldname="Salutation" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Salutation" 
                                data-label="Type In">
                                {
                                    (t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Salutation.Options).map( (salutation, index) => {
                                        var { Display, Value } = salutation;
                                        return <option value={ Value } key={ `${Value}-${index}`} >{ Display }</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div id="firstName" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Required}
                                data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.FirstName.Id}`} 
                                data-regex-pattern="^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðß ,.'-]+$" 
                                data-required-message="" 
                                data-pattern-message="" 
                                data-event-fieldname="Firstname" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Firstname" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_firstName = input }
                            />
                        </div>
                    </div>
                    <div id="lastName" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Required}
                                data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.LastName.Id}`} 
                                data-regex-pattern="^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðß ,.'-]+$" 
                                data-required-message="" 
                                data-pattern-message="" 
                                data-event-fieldname="Lastname" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Lastname" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_lastName = input }
                            />
                        </div>
                    </div>
                    <div id="email" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Required}
                                data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Id}`} 
                                data-regex-pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,17}$" 
                                data-required-message="" 
                                data-pattern-message="Ups, da hat sich wohl ein Fehler in die E-Mail-Adresse eingeschlichen. Bitte überprüfe deine E-Mail." 
                                data-event-fieldname="Email" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Email" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_email = input }
                            />
                            
                            <span id={`error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Email.Id}`}  className="form-input__error active"></span>
                        </div>
                    </div>
                    <div id="street" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Required}
                                data-type="text" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Street.Id}`} 
                                data-required-message="" 
                                data-event-fieldname="Street" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Street" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_street = input }
                            />
                        </div>
                    </div>
                    <div id="houseNumber" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Required}
                                data-type="text" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.HouseNumber.Id}`} 
                                data-required-message="" 
                                data-event-fieldname="HouseNumber" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="HouseNumber" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_houseNumber = input }
                            />
                        </div>
                    </div>
                    <div id="address" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Required}
                                data-type="text" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Address.Id}`} 
                                data-required-message="" 
                                data-event-fieldname="Address" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Address" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_Address = input }
                            />
                        </div>
                    </div>
                    <div id="zip-code" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Required}
                                data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.ZipCode.Id}`} 
                                data-regex-pattern="^\d{4,5}$" 
                                data-required-message="" 
                                data-event-fieldname="ZipCode" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="ZipCode" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_ZipCode = input }
                            />
                        </div>
                    </div>
                    <div id="city" className="input-container">
                        <div className="form-input__container">
                            {/* <label className="form-input__label" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Id} >{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Label}</label> */}
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Id} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Required}
                                data-type="text" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.City.Id}`} 
                                data-required-message="" 
                                data-event-fieldname="City" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="City" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_City = input }
                            />
                        </div>
                    </div>
                    <div id="country" className="input-container">
                        <div className="form-input__container">
                        <label className="form-input__label on-top" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Country.Id}>{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Country.Label} </label>
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Country.Type}
                                name={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Country.Id} 
                                id={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Country.Id} 
                                value={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Country.Value} 
                                disabled
                                ref={ input => this._DETAILS_Country = input }
                            />
                        </div>
                    </div>
                    <div id="dob" className="input-container">
                        <div className="form-input__container dob">
                            <label className="form-input__label on-top" htmlFor={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Id}>{t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Label} </label>
                            <input className="form-input__input js-event-type-in js-event-ab"
                                id="day" 
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Day.Type} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Day.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Required}
                                //data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Id}`} 
                                //data-regex-pattern="^\s*(3[01]|[12][0-9]|0?[1-9])\s*$" 
                                data-required-message="" 
                                data-pattern-message="" 
                                data-event-fieldname="Lastname" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Lastname" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_Birthday_day = input }
                                onChange={ (e)=>{this.checkMinimumAge(e, "^\s*(3[01]|[12][0-9]|0?[1-9])\s*$")}}
                            />
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                id="month"
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Month.Type} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Month.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Required}
                                //data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Id}`} 
                                //data-regex-pattern="^\s*(1[012]|0?[1-9])\s*$" 
                                data-required-message="" 
                                data-pattern-message="" 
                                data-event-fieldname="Lastname" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Lastname" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_Birthday_month = input }
                                onChange={ (e)=>{this.checkMinimumAge(e, "^\s*(1[012]|0?[1-9])\s*$")}}
                            />
                            <input className="form-input__input js-event-type-in js-event-ab" 
                                id="year"
                                type={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Year.Type} 
                                placeholder={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Year.Label} 
                                data-require={t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Required}
                                //data-type="regex" 
                                data-error-target={`#error-${t("Page.Participation.Form.Sections.Details", { returnObjects: true }).Field.Birthday.Id}`} 
                                //data-regex-pattern="^\s*((?:19|20)\d{2})\s*$" 
                                data-required-message="" 
                                data-pattern-message="" 
                                data-event-fieldname="Lastname" 
                                data-event="form-click" 
                                data-category="Form Action" 
                                data-action="Lastname" 
                                data-label="Type In" 
                                ref={ input => this._DETAILS_Birthday_year = input }
                                onChange={ (e)=>{this.checkMinimumAge(e, "^\s*((?:19|20)\d{2})\s*$")}}
                            />
                        </div>
                    </div>
                </div>
                <div className="input-container">
                    <label className="custom-inputs" htmlFor="terms">
                        <span className="text-content">
                            Ich habe die <NavLink to={GLOBAL_CONFIG.Route.terms} exact data-event="info-click" data-category="Informational Action" data-action="T&amp;C" onClick={appGoogleTracking.processEventCTANavLink}>Teilnahmebedingungen</NavLink> gelesen und akzeptiert.*<br />
                            {
                                !this.state.MoreTerms ?
                                <a href="/teilnahmebedingungen" onClick={ (e) => {
                                    e.preventDefault();
                                    this.setState({ MoreTerms: true })
                                }}><strong>„Mehr Informationen &gt;&gt;“</strong></a> : null
                            }
                            {
                                this.state.MoreTerms ?
                                parse(t('Page.Participation.Form.Sections.Details.Field.Terms.HTML'))
                                : null
                            }
                            <span id="error-terms" className="form-input__error active"></span>
                        </span>
                        
                        <input ref={check => this._DETAILS_Terms = check } type="checkbox" id="terms" name="terms" className="js-event-type-in js-event-ab" data-require="true" data-type="checkbox" data-error-target="#error-terms" data-required-message="Bitte akzeptiere die Teilnahmebedingungen, um fortzufahren." data-event-fieldname="Terms" data-event="form-click" data-category="Form Action" data-action="Terms" data-label="Type In"/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                {terms2Html}
                <div className="input-container">
                    <label className="custom-inputs" htmlFor="newsletter">
                        <span className="text-content">
                        {parse(t('Page.Participation.Form.Sections.Details.Field.Newsletter.HTML'))} 
                        </span>
                        <input ref={check => this._DETAILS_News = check } type="checkbox" id="newsletter" name="newsletter" className="js-event-type-in js-event-ab" data-require="false" data-event-fieldname="Newsletter" data-event="form-click" data-category="Form Action" data-action="Newsletter" data-label="Type In" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        );
    }

    calculateAge(birthday) {
        const ageDifMs = Date.now() - birthday;
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    async isNumber(...n){
        for(let i=0; i<n.length; i++){
            if(Number(n[i])!=n[i]){
                return false;
            }
        }
        return true;
    }

    checkMinimumAge(e, regex){
        if(!e.target.value.match(regex)){
            e.target.classList.remove("valid");
            e.target.classList.add("notvalid");
        }else{
            e.target.classList.remove("notvalid");
            e.target.classList.add("valid");
        }
            const day = document.querySelector("input#day"),
            month = document.querySelector("input#month"), 
            year = document.querySelector("input#year");
            if(day && month && year){
                const dayValue = day.value,
                    monthValue=month.value, 
                    yearValue=year.value;
                if(dayValue && monthValue && yearValue){
                    const birthday = new Date(yearValue, monthValue-1, dayValue);
                    const age = this.calculateAge(birthday);
                    this.isNumber(dayValue, monthValue, yearValue).then((val)=>{
                        if( !val || age < 18){
                            day.classList.remove('valid');
                            month.classList.remove('valid');
                            year.classList.remove('valid');
    
                            day.classList.add('notvalid');
                            month.classList.add('notvalid');
                            year.classList.add('notvalid');
                        }else{
                            day.classList.remove('notvalid');
                            month.classList.remove('notvalid');
                            year.classList.remove('notvalid');
    
                            day.classList.add('valid');
                            month.classList.add('valid');
                            year.classList.add('valid');
                        }
                    })
                }
            }
    }

    LabelClicked(e, t) {
        var id = e.target.getAttribute("for"),
            radio = document.getElementById(id),
            value = radio.value || "no";

        if(!radio.checked) {
            radio.checked = true
        }
        if(value === "yes") {
            this.setState({
                IsAdventCalendar: true
            })
            const spanFileError = document.querySelector(".form-input__error.js-file-error");
            if(spanFileError){
                spanFileError.classList.remove("active");
            }
        } else {
            this.setState({
                IsAdventCalendar: false
            });
            
        }
        this.checkProductAmount(value, t);
    }

    checkMinValueOfProductAmount(minValue, t){
        const selectProductAmount = document.getElementById("product-amount");
        if(selectProductAmount.value ==="default" || parseInt(minValue) > parseInt(selectProductAmount.value)){
            this.setState({IsProductAmountInvalid : true});
            selectProductAmount.classList.add('notvalid');
            selectProductAmount.classList.remove('valid');
        }else{
            this.setState({IsProductAmountInvalid : false});
            selectProductAmount.classList.remove('notvalid');
            selectProductAmount.classList.add('valid');
        }
    }

    checkProductAmount(value, t){
        let minValue = t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.MinValue", { returnObjects: true });
        if(value === "yes"){
            if(window.PROMOTION_CAMPAIGN === "rewe"){
                minValue = t("Page.Participation.Form.Sections.Receipt.Field.ProductAmount.MinValueAdventCalendar", { returnObjects: true });
            }
        }
        this.checkMinValueOfProductAmount(minValue, t);
    }

    //Form abondonment - Tracking for Tagging plan
    handleUnload(e) {

        return appGoogleTracking.dataLayerPush({
            'dataEvent': 	'form-click',
            'dataCategory': 'Form Action',
            'dataAction': 	'Form Abandonment',
            'dataLabel': 	appGoogleTracking.fieldConcat
        });
    }

    //Two way binding for input fields
    onChangeHandler = (event) => {
        let e = event.target,
            val = e.value;

        setTimeout(() => {
            let msgID = document.getElementById('purchaseamount-warning'),
                msgEuroID = document.getElementById('purchaseamount-warning-euro');
                //sumSelector = document.getElementById('js-sum-display');

            if(val.indexOf('€') > -1){
                msgEuroID.classList.add('active-success');
                msgID.classList.remove('active-success');
            } else if(val > 200){  //200
                msgID.classList.add('active-success');
                msgEuroID.classList.remove('active-success');
            } else {
                msgID.classList.remove('active-success');
                msgEuroID.classList.remove('active-success');
            }
        },300);
    }

    //Close error message popup
    onClosePopupHandler = () => {
        this.setState({
            loaderError: false,
            loaderGeneralError: false
        });
    }

    //Form submit event
    onSubmitHandler(event) {
        event.preventDefault();
        //Validation of fields
        
        let validateForm = ValidateForm.validateForm('frm_participation'),
            isCodeEntered = !!this._DETAILS_ProductCode ? this._DETAILS_ProductCode.value.length > 0 : true;
        
        let isValid = true;
        if(!isCodeEntered && window.PROMOTION_CAMPAIGN === "rewe" && this._RECEIPT_file.files.length >= 1){
            isValid = true;
        }else{
            isValid = isCodeEntered;
        }

        if(validateForm === true && isValid){
            if(window.PROMOTION_CAMPAIGN === "rewe" && this.state.IsAdventCalendar && window.FILE_STATUS === false){
                window.FILE_STATUS = true;
            }

            //Check if file is valid
            if(window.FILE_STATUS === false){
                setTimeout(() => {
                    if(window.FILE_STATUS === true){
                        //Trigger captcha
                        this.TriggerCaptcha();
                    }
                },800);
            } else {
                //Trigger captcha
                this.TriggerCaptcha();
            }
        } else {
            if(!isCodeEntered) {
                this.setState({
                    CodeIsValid: false
                })
                this._DETAILS_ProductCode.scrollIntoView({ behavior: 'smooth', block: 'start'});
            }

            if(this._RECEIPT_file.files.length < 1){
                this._RECEIPT_file.scrollIntoView({ behavior: 'smooth', block: 'start'});
            } else {
                //Focus the error field
                const errorField = document.querySelector('.notvalid');
                if(errorField){
                    errorField.focus();
                }
            }
            
            const errorField = document.querySelector('.notvalid');
            if(errorField){
                errorField.focus();
            }
            const errorFile = document.querySelector(".form-input__error.js-file-error.active");
            if(errorFile){
                errorFile.focus();
            }
        }
    }

    //Trigger the captcha
    TriggerCaptcha() {
        //Process captcha - after which form ajax will be handle
        if(this._CAPTCHA.getResponse() !== ''){
            this._CAPTCHA.reset();
        } else {
            this._CAPTCHA.execute();
        }
    }

    //When captcha is good -> Callback when Google capture is good
    onResolved = (token) => {
        //Process form
        this.ProcessFormData(token);
    }

    //Construct server date : YYY-MM-DD
    serverDate = (date) => {
        let setDate = date.split('.');
        return setDate[2]+'-'+setDate[1]+'-'+setDate[0];
    }

    serverDateDMY = (day, month, year) => {
        return year+'-'+month+'-'+day;
    }

    //Trigger datalayer push when form is successful
    triggerDatalayers = (param) => {
        if(param.status === 'success'){
            let retailerPlace = this._RECEIPT_ProductAmount.value,
                datePurchase  = this._RECEIPT_ReceiptDate.value;

            //Product retailer place
            appGoogleTracking.dataLayerPush({
                'dataEvent': 	'button-click',
                'dataCategory': 'Click Action',
                'dataAction': 	'Form Submission',
                'dataLabel': 	param.participationID
            });

            //Valid participation
            appGoogleTracking.dataLayerPush({
                'dataEvent': 	'form-click',
                'dataCategory': 'Form Action',
                'dataAction': 	'Form Validated',
                'dataLabel': 	param.participationID
            });

            //Receipt upload
            appGoogleTracking.dataLayerPush({
                'dataEvent': 	'button-click',
                'dataCategory': 'Click Action',
                'dataAction': 	'Upload Receipt',
                'dataLabel': 	timeStamp()
            });

            //Date purchase
            appGoogleTracking.dataLayerPush({
                'dataEvent': 	'button-click',
                'dataCategory': 'Click Action',
                'dataAction': 	'Date of Purchase',
                'dataLabel': 	datePurchase
            });

            //Place of Purchasse
            appGoogleTracking.dataLayerPush({
                'dataEvent': 	'button-click',
                'dataCategory': 'Click Action',
                'dataAction': 	'Amount Purchased',
                'dataLabel': 	retailerPlace
            });
        } else if(param.status === 'error'){
            if(param.type === 'participate'){
                appGoogleTracking.dataLayerPush({
                    'dataEvent': 	'form-click',
                    'dataCategory': 'Form Action',
                    'dataAction': 	'Already Participated',
                    'dataLabel': 	timeStamp()
                });
            } else {
                appGoogleTracking.dataLayerPush({
                    'dataEvent': 	'form-click',
                    'dataCategory': 'Form Action',
                    'dataAction': 	'Form Not Valid',
                    'dataLabel': 	'Error Type'
                });
            }
        }
    }

    //Process form when Captcha is OK
    ProcessFormData(token) {
        //Open loader
        this.setState({
            loaderSubmit: true
        });


        let fileUploaded = null;
        if(window.PROMOTION_CAMPAIGN == "rewe"){
            if(this._RECEIPT_file.files.length >= 1){
                fileUploaded = this._RECEIPT_file.files[0];
            }
        }else{
            fileUploaded = this._RECEIPT_file.files[0];
        }

        //Process form data
        let data = {
            fileinput: fileUploaded,
            PurchaseDate: this.serverDate(this._RECEIPT_ReceiptDate.value),
            NumberPurchased: this._RECEIPT_ProductAmount.value,
            PurchaseAmount: this.state.ReceiptSum !== this.DefaultSum ? this.state.ReceiptSum : "0" ,
            Salutation: this._DETAILS_salutation.value,
            Firstname: this._DETAILS_firstName.value,
            Lastname: this._DETAILS_lastName.value,
            EmailAddress: this._DETAILS_email.value,
            DOB: this.serverDateDMY(
                this._DETAILS_Birthday_day.value, 
                this._DETAILS_Birthday_month.value, 
                this._DETAILS_Birthday_year.value
                ),
            StreetName: this._DETAILS_street.value,
            StreetNumber: this._DETAILS_houseNumber.value,
            PostalCode: this._DETAILS_ZipCode.value,
            City: this._DETAILS_City.value,
            AddressAdditionalInfo: this._DETAILS_Address.value,
            Consent: this._DETAILS_Terms.checked ? true : false,
            OptinNewsletter: this._DETAILS_News.checked ? true : false,
            IsAdventCalender: this.state.IsAdventCalendar,
            ProductCode: !!this._DETAILS_ProductCode ? this._DETAILS_ProductCode.value : null,
            Captcha: token
        };

        //Form Data is used to passe the receipt as binary

        let _data = new FormData();

        for(let key in data){
            _data.append(key, data[key]);
        }

        CampaignServices.Participate({data: _data, retailer: window.PROMOTION_CAMPAIGN})
        .then((response) => {
            let { Success, Message, ParticipationId, Data } = response.data;

            if( Success ) {
                //SET Participation ID
                sessionStorage.setItem(GLOBAL_CONFIG.Session.userstatus, "participate")
                window.PARTICIPATION_ID = ParticipationId;

                //Datalayer push for Success participation
                this.triggerDatalayers({
                    status: 'success',
                    participationID: ParticipationId
                });

                //Go to Thank you page
                this.props.history.push({pathname: GLOBAL_CONFIG.Route.thankyou});
            } else {
                let errorStatus = Data.Error[0];
                if(!!errorStatus) {
                    this.ProcessError(errorStatus)
                }
                this._CAPTCHA.reset(); 
            }
        })
        .catch( (error) => {
            let { Data } = error.response.data,
                errorStatus = Data.Error[0] || "";

            this.ProcessError(errorStatus)

            this._CAPTCHA.reset();
        });
    }

    ProcessError(_ERR) {
        switch (_ERR.toUpperCase()) {
            case "NUMBEROFPARTICIPATION_INVALID":
                this.setState({
                    loaderSubmit: false,
                    loaderError: true,
                    genericErrorMessage: this.errorMessage
                });
    
                this.triggerDatalayers({
                    status: 'error',
                    type: 'participate'
                });
                break;
            case "INVALID_RECAPTCHA_RESPONSE":
                this.setState({
                    loaderSubmit: false,
                    loaderGeneralError: true,
                    genericErrorMessage: this.errorMessage
                });

                this.triggerDatalayers({
                    status: 'error',
                    type: 'general'
                });
                break;

            case "INVALID_LOTCODE":
                this.setState({
                    loaderSubmit: false,
                    loaderGeneralError: true,
                    CodeIsValid: false,
                    genericErrorMessage: "INVALID_LOTCODE"
                });

                if(!!this._DETAILS_ProductCode) {
                    this._DETAILS_ProductCode.scrollIntoView({ behavior: 'smooth', block: 'start'});
                }
                this.errorMessage = "Du hast keinen gültigen Produktcode eingegeben. Bitte versuche es erneut oder lade deinen Kassenbon hoch.";
            default:
                this.setState({
                    loaderSubmit: false,
                    loaderGeneralError: true,
                    genericErrorMessage: this.errorMessage
                });
                break;
        }
    }
}

export default withTranslation()(withRouter(Participation));