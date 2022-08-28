import React, { Component } from 'react';
import axios from 'axios'; 
import parse from 'html-react-parser';  
import Aux from '../../hoc/Auxiliare';               
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import { pageSection, servicePath, mainLoaderToggle, navParticipationMenu, scrollToElement } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';

const WinnerModel = {

    contentTitle: {
        heading: parse('Du hast die Wahl – Schokolade <span>oder Spende?</span>'),
        paragraph: parse('Deine Gewinn-Auswahl war ein Volltreffer! In deinem Glückspaket verbirgt sich eine Tafel Milka Schokolade! Alternativ kannst du eine Spende in Höhe von 1€ an die Tafel Deutschland e.V. veranlassen.<br /><br /> Klicke, um deine Auswahl zu treffen.'),
    },

    contentTitleChocolate: {
        heading: parse('Dein Gewinn: eine Tafel Milka <span>Schokolade</span>'),
        paragraph: parse('Deine Tafel Milka Alpenmilch Schokolade hat einen Wert <br />von ca. 1€ und wird dir postalisch zugesendet. <br /><br /> <strong>Viel Spaß beim Naschen!</strong>')
    },

    contentTitleDonation: {
        heading: parse('Dein Gewinn: Spende in Höhe von <span>1€ an die Tafel Deutschland e.V.</span>'),
        paragraph: parse('Toll, dass du dazu beigetragen hast, dass der Spende noch <br />höher ausfällt! Milka veranlasst nach Abschluss der Aktion <br />für deine Tafel Schokolade eine Spende in Höhe von 1€ an <br />die Tafel Deutschland e.V. veranlassen.')
    },
};

class Winner extends Component { 

    state = {
        mainLoader: true,
        loaderSubmit: false,
        showWinnerSelection: false,
        winnerID: '',
        winnerSelected: false,
        winnerChose: ''
    }

    //To display the correct display : token is capture in the URL
    //URL : ?token=XXXXXXXX
    loadWinner = (token) => {
        //Get correct URL
        /*let getPathname = window.location.pathname.split('/'),
            getID = getPathname[2];*/

        let getID = token;

        let getWinnerLoaderURL = servicePath({      //Webservice path
            ...GLOBAL_CONFIG.ServiceSettings,
            status: 'winnerload'
        });

        //Ajax call to check if the ID is good or not
        axios({
            method: 'post',
            url: getWinnerLoaderURL,
            data: {
                token: getID
            }
        }) 
        .then((response) => {

            if(response.status === 200 || response.status === 201){

                if(response.data.data.prizeEnd === false){

                    if(response.data.success === true && response.data.message === 'PARTICIPATION_VALID'){
                        //Show the gift selection to the user : chocolate or donation
                        this.setState({
                            showWinnerSelection: true,
                            winnerID: getID
                        });
                    } else if(response.data.success === false){
                        if(response.data.message === 'ALREADY_CLAIM'){
                            //Show user what they have selected
                            this.setState({
                                showWinnerSelection: false,
                                winnerSelected: true,
                                winnerChose: response.data.selection
                            });
                        } else {
                            //Go to Home page
                            this.props.history.push({pathname: GLOBAL_CONFIG.Route.home});  
                        }
                    }

                    //Remove main loader
                    mainLoaderToggle('hide');
                } else {
                    this.props.history.push({pathname: GLOBAL_CONFIG.Route.home});  //Go to home page if campaign is over
                }
            } else {
                console.log('Winner Error in response');
                //Go to Home page
                this.props.history.push({pathname: GLOBAL_CONFIG.Route.home}); 
            }
        })
        .catch((response) => {
            //Error 
            console.log('Winner Error in response 2');
            //Go to Home page
            this.props.history.push({pathname: GLOBAL_CONFIG.Route.home}); 
        });

    }

    //Selection of gift
    onSelectGiftHandler = (selection) => {
        this.setState({
            loaderSubmit: true
        });

        let getWinnerSelectionURL = servicePath({   //Webservice path
            ...GLOBAL_CONFIG.ServiceSettings,
            status: 'winnerselect'
        });

        //Ajax call
        axios({
            method: 'post',
            url: getWinnerSelectionURL,
            data: {
                token: this.state.winnerID,
                selection: selection
            }
        })
        .then((response) => {

            if(response.status === 200 || response.status === 201){ 
               
                if(response.data.success === true){
                    //Set state
                    this.setState({
                        showWinnerSelection: false,
                        winnerSelected: true,
                        winnerChose: selection
                    });

                    //Scroll to view element
                    scrollToElement();

                    //Tagging
                    appGoogleTracking.dataLayerPush({
                        'customEvent': {
                            'event': 'button-click',
                            'category': 'Click Action',
                            'action': 	'Prize selection',
                            'Prize_level_7': selection
                        }
                    });
                } else {
                    //Error - check which error message needs to be display
                    console.log('Winner Selection Error in response - false');
                }
            } else {
                //Error - check which error message needs to be display
                console.log('Winner Selection Error in response - not 200 status');
            }

            this.setState({
                loaderSubmit: false
            });

            //console.log('Ajax: '+this.state.showWinnerSelection);
        })
        .catch((response) => {
            //Error - check which error message needs to be display
            console.log('Winner Selection Error in response - 404 or 500');

            this.setState({
                loaderSubmit: false
            });
        });
    }

    //Use regex to validate the field value - extract for validate.js
	validateRegex = (regExpression,val) => {
		var regEX = new RegExp(regExpression);
	
		if(regEX.test(val)){
		   return true; 
		} else {
			return false;
		}
    }

    //Use to check if the route is : winner?token=4545asdasd4545 is in this format   winner is localize, check in config
    winnerRoute = () => {
        let getTokenPath = this.props.history.location.search,      //React provide the history props, where get several information about the URL
            regexExpression = /\?token=([a-zA-z0-9])+$/;

        if(getTokenPath !== '' && this.validateRegex(regexExpression,getTokenPath)){
           return getTokenPath.split('=')[1];       //Return the token from the URL
        } else {
            this.props.history.push({pathname: GLOBAL_CONFIG.Route.home});      //Page is redirect if the url format is different
        }
    }

    componentWillMount(){
        let getToken = this.winnerRoute();

        this.loadWinner(getToken); 
    }

    componentDidMount(){
        //Page section
        pageSection('js-newsletter-optins','Winner');

        //Participation menu active
        navParticipationMenu(true);

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': '/Winner',
                'pageTitle': document.title
            }
        });
    }

    componentWillUnmount(){
        //Show mainloader
        mainLoaderToggle('show');

        //Remove active menu participation - mitmachen
        navParticipationMenu(false);
    }

    render() {

        //Loader
        let submitLoader = null,
            winnerSelection = null,
            winnerGiftSelection = null;

        //Show loader when user select a gift : chocolate or donation
        if(this.state.loaderSubmit === true){
            submitLoader = (
                <div className="simple-loader__container active">
                    <div className="simple-loader__indicator"></div>
                </div>  
            );
        }

        //Show selection to user
        if(this.state.showWinnerSelection === true){
            winnerSelection = (
                <Aux>
                    <div className="content-winner">
                        <TitleContent 
                            heading={WinnerModel.contentTitle.heading} 
                            paragraph={WinnerModel.contentTitle.paragraph}
                        />
                        <div className="content-winner__gifts">
                            <div className="content-winner__gifts-item">
                                <img src="/resources/images/gift-tafel.png" width="366" height="156" alt="Chocolate gift" className="first" />
                                <p className="link-btn first" onClick={() => this.onSelectGiftHandler('chocolate')}>Ich wähle die Tafel Schokolade</p>
                            </div>
                            <div className="content-winner__gifts-item">
                                <img src="/resources/images/gift-donation.png" width="303" height="333" alt="Donation" />
                                <p className="link-btn" onClick={() => this.onSelectGiftHandler('donation')}>Ich spende 1€ an die Tafel Deutschland e.V.</p>
                            </div>
                        </div>
                    </div>
                    {submitLoader}
                </Aux>
            );
        }

        //Show what the user has selected
        if(this.state.winnerSelected === true){
            if(this.state.winnerChose === 'chocolate'){
                winnerGiftSelection = (
                    <Aux>
                        <div className="content-winner">
                            <TitleContent 
                                heading={WinnerModel.contentTitleChocolate.heading} 
                                paragraph={WinnerModel.contentTitleChocolate.paragraph}
                            />
                            <div className="content-winner__gifts-selected">
                                <img src="/resources/images/gift-tafel-big.png" width="604" height="278" alt="gift tafel" />
                            </div>
                        </div>
                    </Aux>
                );
            } else if(this.state.winnerChose === 'donation'){ 
                winnerGiftSelection = (
                    <Aux>
                        <div className="content-winner">
                            <TitleContent 
                                heading={WinnerModel.contentTitleDonation.heading} 
                                paragraph={WinnerModel.contentTitleDonation.paragraph}
                            />
                            <div className="content-winner__gifts-selected">
                                <img src="/resources/images/gift-donation-big.png" width="374" height="405" alt="gift donation" />
                            </div>
                        </div>
                    </Aux>
                );
            }
        }

        return (
            <Aux>
                {winnerSelection}
                {winnerGiftSelection}
            </Aux>
        );
    }
} 

export default Winner;
