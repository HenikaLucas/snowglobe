import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';               //Routing component - to display the corresponding containers
import GLOBAL_CONFIG from '../config/config';		            //Global Settings that contains URL etc
//import AsyncComponent from '../../hoc/AsyncComponent';       //Async loading of components    
import MetaHeader from '../components/Content/MetaHeader/MetaHeader';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Banner from '../components/Layout/Banner';
import NavigationContent from '../components/Content/NavigationContent/NavigationContent';

/*
    All website pages as container
*/
import Home from '../pages/Home/Home';                            //Home page content
import Holding from '../pages/Holding/Holding';                   //Holding page content
import Prize from '../pages/Prize/Prize';                         //Prize page content
import Participation from '../pages/Participation/Participation'; //Parcipation page content
import ThankYou from '../pages/ThankYou/ThankYou';                //Thank you page content
import Faq from '../pages/Faq/Faq';                               //FAQ page content
import End from '../pages/End/End';                               //End Campaign page content
import Terms from '../pages/Terms/Terms';                         //Terms and conditions page content
import Error from '../pages/Error/Error';                         //Error page content  
import Cookie from '../pages/Cookie/Cookie';                      //Cookie page content

/* Lazy loading of component */
/*
const Home          = React.lazy(() => import('../Home/Home'));                     //Home page content
const Holding       = React.lazy(() => import('../Holding/Holding'));               //Holding page content                    
const Prize         = React.lazy(() => import('../Prize/Prize'));                   //Prize page content
const Participation = React.lazy(() => import('../Participation/Participation'));   //Parcipation page content
const ThankYou      = React.lazy(() => import('../ThankYou/ThankYou'));             //Thank you page content
const Faq           = React.lazy(() => import('../Faq/Faq'));                       //FAQ page content
const End           = React.lazy(() => import('../End/End'));                       //End Campaign page content
const Terms         = React.lazy(() => import('../Terms/Terms'));                   //Terms and conditions page content
const Error         = React.lazy(() => import('../Error/Error'));                   //Error page content 
const Cookie        = React.lazy(() => import('../Cookie/Cookie'));                 //Cookie page content
*/

// Use layout as the main wrapper for our app
class Layout extends Component {

    render(){
        //Campaign is assign
        let RouteRender = null,
            NavContent = null;

        if(this.props.campaign === true){

            
             //Routing check for 
            if(this.props.campaignStatus !== 'holding') {
                NavContent = <NavigationContent campaign={this.props.campaignStatus} />;
            }

            if(this.props.campaignStatus === 'main'){
                RouteRender = (
                    <Switch> 
                        <Route path={GLOBAL_CONFIG.Route.home} exact component={Home} />
                        <Route component={Error} /> 
                    </Switch> 
                );
            } else if(this.props.campaignStatus === 'holding'){
                RouteRender = (
                    <Switch> 
                        <Route path="/" exact component={Holding} /> 
                        <Route path={GLOBAL_CONFIG.Route.cookie} exact component={Cookie} />
                        <Route component={Error} /> 
                    </Switch> 
                );

                NavContent = null;      //No inner Navigation
            } else if(this.props.campaignStatus === 'end'){
                RouteRender = (
                    <Switch> 
                        <Route path="/" exact component={End} /> 
                        <Route path={GLOBAL_CONFIG.Route.cookie} exact component={Cookie} />
                        <Route component={Error} /> 
                    </Switch> 
                );

                NavContent = null;      //No inner Navigation
            }
        } 

        //Master page - that contains all routes for the different pages / containers
        return (
            <>
                <MetaHeader promotionCampaign={this.props.promotionCampaign} />
                <Header />
                <main className="main-content">
                    <Banner campaignStatus={this.props.campaignStatus} promotionCampaign={this.props.promotionCampaign} />
                    {RouteRender}
                </main>
                <Footer />
            </>
        );
    }
}

export default Layout;