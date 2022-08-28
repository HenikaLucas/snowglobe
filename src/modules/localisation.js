import i18n from "i18next";                                             //Use for localization of text
import axios from "axios";
import GLOBAL_CONFIG from "../config/config";
import { campaignSettings } from '../modules/helpers';
import _LOCALISATION_PATH from "../Models/LocalisationPaths";

//Get campaign status -> rewe, kaufland or muller
const PROMOTION_SETTINGS = campaignSettings(GLOBAL_CONFIG);

let CONTENT__ALL = null,
    __JSON_PATH = null;

//Set JSON file to retrieve
if(!!PROMOTION_SETTINGS.campaignStatus 
    && typeof PROMOTION_SETTINGS.campaignStatus === "string") {
    __JSON_PATH = _LOCALISATION_PATH[PROMOTION_SETTINGS.campaignStatus] || null;
}

//Get JSON localisation
const getLocalisation = async () => {
    try {
        if(!!__JSON_PATH) {
            return await axios.get(`${__JSON_PATH}?version=${GLOBAL_CONFIG.Localisation.version}`);
        }
        return 'error';
    } catch (e) {
        return 'error';
    }
}

const initLocalisation = () => {
    i18n.init({
        lng: 'en',
        // we init with resources
        resources: {
            en: CONTENT__ALL
        },
        fallbackLng: "en",
        debug: false,
    
        // have a common namespace used around the full app
        ns: ["data"],
        defaultNS: "data",
    
        keySeparator: ".",
    
        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ","
        },
        cache: {
            enabled: false
        },
    
        react: {
            wait: false
        }
    });
}

//Build the localisation process
const buildLocalisedContent = async () => {
    try {
        CONTENT__ALL = await getLocalisation();

        initLocalisation();
    } catch (e) {
        console.error(e);
    }
}

//Initialize the localisation process to gather the JSON data
buildLocalisedContent();

export default i18n;


