import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import GLOBAL_CONFIG from '../../config/config';
import appGoogleTracking from '../../modules/googletracking';
import { mainLoaderToggle } from '../../modules/helpers';
import TitleContent from '../../components/Content/TitleContent/TitleContent';

const CookieModel = {

    contentTitle: {
        heading: 'COOKIES HINWEIS'
    }   
};

class Cookie extends Component { 

    componentDidMount(){  
        const { t } = this.props;
        //Remove main loader
        mainLoaderToggle('hide');

        //Virtual page
        appGoogleTracking.dataLayerPush({
            'customEvent': {
                'event': 'virtual-page',
                'virtualUri': GLOBAL_CONFIG.Route.cookie,
                'pageTitle': t('Meta.title')
            }
        });
    }

    componentWillUnmount(){
        //Show mainloader
        mainLoaderToggle('show');
    }

    render() { 

        return (
            <div className="container medium-copy cookie-content">
                <div className="cookie-page__content">
                    <TitleContent 
                        heading={CookieModel.contentTitle.heading} 
                    />
                    <div className="s-content-copy">
                        <div className="s-content-copy__item">
                            <p>Ein Cookie ist eine kleine Textdatei, die beim Besuch einer Website auf Ihrem Computer oder Ihrem Mobilgerät gespeichert wird. Cookies werden dann bei jedem weiteren Besuch an die ursprüngliche Website oder an eine andere Website, die dieses Cookie erkennt, zurückgesendet, um eine Aufzeichnung Ihrer Online-Aktivität zu erstellen. Die folgenden Cookies können auf dieser Webseite vorhanden sein: </p>
                            <ul className="list-marker">
                                <li>Wird nach jedem Besuch automatisch gelöscht (Sitzungscookies) oder bleibt bei mehreren Besuchen erhalten (dauerhafte Cookies).</li>
                                <li>Wird in einem in einem Erstanbieter-Kontext (von uns festgelegt) oder Drittanbieter-Kontext (von einer anderen Website festgelegt) geliefert. Auf  dieser Website verwenden wir und Dritte Cookies für verschiedene Zwecke, insbesondere zur Vereinfachung der Navigation auf unseren Webseiten, zur Personalisierung des Inhaltes, um Werbung auf Ihre Präferenzen anzupassen und die Nutzungshäufigkeit unserer Webseite zu ermitteln. </li>
                            </ul>
                            <p>Im  Einzelnen verwenden wir folgende Cookies:</p>
                            <div id="ot-sdk-cookie-policy"></div>
                        </div>
                        <div className="s-content-copy__item">
                            <h2>WEBSEITEN-COOKIES VON DRITTANBIETERN.</h2>
                            <br />
                            <p>Bei der Nutzung unserer Website können eingebettete Inhalte auftreten oder Sie werden für bestimmte Aktivitäten auf andere Websites weitergeleitet. Diese Websites und eingebetteten Inhalte verwenden möglicherweise eigene Cookies. Wir haben keine Kontrolle über die Platzierung von Cookies durch andere Websites, selbst wenn Sie von unserer Website auf diese verwiesen werden.</p>
                            <p>In unserem Cookies-Präferenzen-Center können Sie Ihre Cookie-Einstellungen anpassen. Das Tool zeichnet Ihre Zustimmung zu unserer Cookie-Richtlinie auf und fordert Sie alle 12 Monate erneut auf, um sicherzustellen, dass Sie über Änderungen unserer Cookie-Richtlinie auf dem Laufenden bleiben. Unser Tool steuert die von uns gesetzten Leistungs-, Funktions- und Targeting-Cookies. Unbedingt erforderliche Cookies können weder deaktiviert werden, noch kann das Tool zum Blockieren von Cookies auf Websites Dritter verwendet werden, auf die von unserer Website aus verwiesen wird. Viele der auf unserer Website verwendeten Cookies können auch über Ihren Browser aktiviert oder deaktiviert werden. Befolgen Sie dazu die Anweisungen, die sich normalerweise in den Menüs "Hilfe", "Extras" oder "Bearbeiten" Ihres Browsers befinden.</p>
                            <p>Bitte beachten Sie, dass das Deaktivieren eines Cookies oder einer Kategorie von Cookies das Cookie nicht aus Ihrem Browser löscht, es sei denn, dies wird manuell über Ihre Browserfunktion ausgeführt.</p>
                            <button id="ot-sdk-btn" className="ot-sdk-show-settings">Cookie Settings</button>
                        </div>
                        
                    </div>
                </div>
               

            </div>
        );
    }
}

export default withTranslation()(Cookie);