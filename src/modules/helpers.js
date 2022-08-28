import _LOCAL_CAPTCHA from "../Models/Captcha";
import _LOCAL_GTM from "../Models/GTM";

//Set page section for each component for Tracking of Newsletter on Component Navigation menu
export function pageSection(elementID,pageSection){
    document.getElementById(elementID).setAttribute('data-label',pageSection);
}

//Get campaign settings - all require settings for the whole campaign goes here
export function campaignSettings(param){
    let getLocation = window.location.host,
        setting = {};

    if(getLocation.indexOf('rewe') > -1){
        setting.campaignStatus = 'rewe';
    } else if(getLocation.indexOf('kaufland') > -1){
        setting.campaignStatus = 'kaufland';
    } else if(getLocation.indexOf('mueller') > -1){
        setting.campaignStatus = 'muller';
    } else if(getLocation.indexOf('netto') > -1){
        setting.campaignStatus = 'netto';
    } else if(getLocation.indexOf('edeka') > -1){
        setting.campaignStatus = 'edeka';
    } else {
        setting.campaignStatus = param.Settings.defaultSite;  //Default - to change or erase
    }

    if(!!setting.campaignStatus && typeof setting.campaignStatus === "string") {
        setting.siteKey = _LOCAL_CAPTCHA[setting.campaignStatus].key || "6LfWEs8ZAAAAABdXUIRvUbcVHid8KRgbfAQGvZtA";
        setting.gtmID = _LOCAL_GTM[setting.campaignStatus]; 
    }

    return setting;
}

//Set all paths for webservices
/* 
    Configuration with config.js
    Path for:
        - campaign status
        - participation
*/
export function servicePath(param){
    let returnPath = '',
        campaign = (param.campaign === 'muller') ? 'mueller' : param.campaign;

    //Campaign promotion webservice path
    if(param.status === 'global'){
        returnPath = '/api/'+campaign+param.campaignURL;
    }
    //Participation webservice path
    else if(param.status === 'participation'){
        returnPath = '/api/'+campaign+param.particationURL;
    }

    return returnPath;
}

//Main loader - to use on all containers
export function mainLoaderToggle(status){
    let loaderSelector = document.querySelector('.js-main-loader');

    if(status === 'show'){
        loaderSelector.classList.add('active');
    } else {
        loaderSelector.classList.remove('active');
    }
}

//Navigation menu active for Mitmachen / Participation
export function navParticipationMenu(active){
    let menuSelector = document.querySelector('.main-nav li:nth-child(2) a');

    if(active === true){
        if(!menuSelector.classList.contains('active')){
            menuSelector.classList.add('active');
        }
    } else {
        //Remove active menu participation - mitmachen
        menuSelector.classList.remove('active');
    }
}

//Scroll to View Navigation - mainly use when Navlink are click on the page - function call on googletracking.js
//Can be customise for future use
export function scrollToElement(){
    document.querySelector('.navigation-newsletter').scrollIntoView({ behavior: 'smooth', block: 'start'});
}

//Timestamp for Tagging plan - can be customise for different format
//Return format : MM/DD/YYYY
export function timeStamp(){
    let date        = new Date(),
        day         = date.getDate(),
        month       = date.getMonth() + 1,
        dayformat   = (day < 10) ? '0'+day : day,
        monthformat = ( month < 10) ? '0'+month  : month,
        timeStamp   = monthformat+'/'+dayformat+'/'+date.getFullYear();

    return timeStamp;
}

//Function to create option list
export function optionListConstruct(listitem){
    let listItemLength = listitem.length,
        listStr = '';

    for(let i=0; i<listItemLength; i++){
        if(listitem[i] === '11'){
            listStr += '<option value="'+listitem[i]+'">>10</option>'
        } else {
            listStr += '<option value="'+listitem[i]+'">'+listitem[i]+'</option>'
        }
    }

    return listStr;
}

export function dateConfig(param){
    let minDate = '',
        maxDate = '';
    
    if(param.promotion === 'rewe'){
        minDate = param.rewe.start;
        maxDate = param.rewe.end;
    } else if(param.promotion === 'kaufland'){
        minDate = param.kaufland.start;
        maxDate = param.kaufland.end;
    } else if(param.promotion === 'muller'){ 
        minDate = param.muller.start;
        maxDate = param.muller.end;
    } else if(param.promotion === 'edeka'){
        minDate = param.edeka.start;
        maxDate = param.edeka.end;
    }else if(param.promotion === 'netto'){
        minDate = param.netto.start;
        maxDate = param.netto.end;
    }

    return (param.status === 'min') ? minDate : maxDate;
}

export default { 
    pageSection, 
    campaignSettings,
    servicePath, 
    mainLoaderToggle, 
    navParticipationMenu,
    scrollToElement,
    timeStamp,
    optionListConstruct,
    dateConfig
};