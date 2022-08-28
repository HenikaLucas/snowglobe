import React, { Component } from 'react';
import parse from 'html-react-parser'; 
import GLOBAL_CONFIG from '../../config/config'; 
import Aux from '../../hoc/Auxiliare'; 
import TitleContent from '../../components/Content/TitleContent/TitleContent';

const GiftModel = {

    contentTitle: {
        heading: parse('Jetzt Glückspaket öffnen und <span>Gewinnchance sichern!</span>'),
        subheading: parse('<span>Wähle jetzt per Klick dein Glückspaket aus und erfahre</span> <span>sofort, ob du gewonnen hast. Glücksgewinne im Wert von € 11</span> <span>Millionen warten auf dich. Jede zweite Teilnahme gewinnt!</span>')
    }
}

class Gift extends Component { 

    componentWillMount(){
        if(sessionStorage.getItem(GLOBAL_CONFIG.Session.userstatus) === null){
            //Go to particaption page
            this.props.history.push({pathname: GLOBAL_CONFIG.Route.participation});
        }
    }

    componentDidMount(){
        //Active menu participation - mitmachen
        document.querySelector('.main-nav li:nth-child(2) a').classList.add('active');
    }

    showConfirmation = () => {
        //Go to confirmation page
        this.props.history.push({pathname: GLOBAL_CONFIG.Route.thankyou});
    }

    render() {

        return (
            <Aux>
                <TitleContent 
                    heading={GiftModel.contentTitle.heading} 
                    subheading={GiftModel.contentTitle.subheading}
                />
                <div className="content-gifts">
                    Gift Selection goes here
                    <br />
                    <br />
                    <button type="button" onClick={this.showConfirmation}>Go to Thak you page</button>
                    <br />
                    <br />
                </div>
            </Aux>
        );
    }
}

export default Gift;