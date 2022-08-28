//Milka Christmas POS 2021 - some optimization was done from the previous project

const GLOBAL_CONFIG = { 
    /* 
        Main Settings
    */
    Settings: {
        localDev: 		false,					//Need to be false on staging and prod
        campaign: 		true,					//True or false
        campaignStatus: 'main',					//main, holding, end
		localDomain: 	'localhost',
        defaultSite:    'rewe',                 //rewe, kaufland, muller, edeka, netto
        fileStatus:     false,
        pageSection:    '',
        innerLink:      false
    },

    /*
        URL for webservices
    */
    ServiceSettings: {
        //Webservices
        campaignURL:            '/status',
        particationURL:         '/participate'
    },

    /*
        URLs for the different page
    */
    Route: {
        home:           '/',
        holding:        '/holding',    
        end:            '/',      
        prize:          '/gewinne',                     // prize
        participation:  '/mitmachen',                   //particpation
        gift:           '/gift',                        //gift
        thankyou:       '/confirm',                     //Thank you
        product:        '/produkte',                    //product
        faq:            '/faq',                         //faq
        terms:          '/teilnahmebedingungen',        //terms
        cookie:         '/cookie',                      //cookie
    },

    /* 
        Google recaptcha config
    */
    Captcha: {
        siteKeyRewe:     '6LfWEs8ZAAAAABdXUIRvUbcVHid8KRgbfAQGvZtA',
        siteKeyKaufland: '6LfWEs8ZAAAAABdXUIRvUbcVHid8KRgbfAQGvZtA',
        siteKeyMuller:   '6LfWEs8ZAAAAABdXUIRvUbcVHid8KRgbfAQGvZtA',
        language: 'de'
    },

    /*
        GTM ID : Google gtm scripts
    */
    GTM: {
        gtmTag:         true,                //true or false 
        gtmIDRewe:      'GTM-WXNN86L',       //need to put the correct one - dev GTM-000000
        gtmIDKaufland:  'GTM-M76THVK',       //GTM-M76THVK
        gtmIDMuller:    'GTM-N998ZM7'
    },

    Session: {
        userstatus: 'userstatus'
    },

    JSON: {
        rewe:       '/resources/localisation/rewe_localisation.json',
        kaufland:   '/resources/localisation/kaufland_localisation.json',
        muller:     '/resources/localisation/muller_localisation.json',
        netto:     '/resources/localisation/netto_localisation.json',
    },

    Localisation: {
		path: "/resources/localisation/",
		version: 'K74036SQ97E1AF857WDF9S5D'
	},

    Date: {
        rewe: {
            start:  '21.02.2022',
            end:    '16.04.2022'
        },
        kaufland: {
            start:  '21.02.2022',
            end:    '16.04.2022'
        },
        muller: {
            start:  '21.02.2022',
            end:    '16.04.2022'
        },
        edeka: {
            start:  '21.02.2022',
            end:    '17.04.2022'
        },
        netto: {
            start:  '18.10.2021',
            end:    '24.12.2021'
        }
    }

}

export default GLOBAL_CONFIG;