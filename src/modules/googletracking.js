import { scrollToElement } from './helpers';

const appGoogleTracking = {

    abandonStatus: false,
    fields: [],
	fieldConcat: '',

    //Push the information to dataLayer
	dataLayerPush: function(param){
		
		if(typeof window.dataLayer !== 'undefined'){
            let data = {};
            
            //Main datalayer
            if(param.dataEvent != undefined){
                data.event = param.dataEvent;
            }
            if(param.dataCategory != undefined){
                data.category = param.dataCategory;
            }
            if(param.dataAction != undefined){
                data.action = param.dataAction;
            }
            if(param.dataLabel != undefined){
                data.label = param.dataLabel;
            }
            
            //Custom dataLayer : mainly one push
            if(param.customEvent != undefined){
                data = param.customEvent;
            }
            
            window.dataLayer.push(data);
        } else {
            console.log('Datalayer not set');	
        }
	},

    //Process CTA links mainly - "this" is not applicable as its directly bind on onclick event
    processEventCTA: function(event){
        event.preventDefault();

        let targetElement = event.currentTarget || event.srcElement;

        appGoogleTracking.dataLayerPush({
            'dataEvent': 	targetElement.getAttribute('data-event'),
			'dataCategory': targetElement.getAttribute('data-category'),
			'dataAction': 	targetElement.getAttribute('data-action'),
			'dataLabel': 	(targetElement.getAttribute('data-label') == undefined) ? document.title : targetElement.getAttribute('data-label')
        });

        if(targetElement.getAttribute('data-event-exception') == undefined){
			if(targetElement.getAttribute('target') != undefined){
				window.open(targetElement.getAttribute('href'),'_blank');
			} else {
				window.location.href = targetElement.getAttribute('href');
			}	
		} 
    },

    //Process CTA links on NavLink Routing
    processEventCTANavLink: function(event){
        let targetElement = event.currentTarget || event.srcElement;

        appGoogleTracking.dataLayerPush({
            'dataEvent': 	targetElement.getAttribute('data-event'),
			'dataCategory': targetElement.getAttribute('data-category'),
			'dataAction': 	targetElement.getAttribute('data-action'),
			'dataLabel': 	(targetElement.getAttribute('data-label') == undefined) ? document.title : targetElement.getAttribute('data-label')
        });

        //Set Navlink - not from refresh page
        scrollToElement();
    },

    //Helper for sorting of array - very interesting function
	dynamicSort: function(property){
		let sortOrder = 1;
		if(property[0] === '-'){
			sortOrder = -1;
			property = property.substr(1);
		}
		return function(a,b){
			let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	},

    //Process index assigner on the desired form
    indexAssigner: function(param){
        let counter = 1;

        for(let i=0; i < param.selectorInputsLength; i++){ 
            param.selectorInputs[i].setAttribute('data-event-index',counter);
            counter++;
        }
    },

    processAbandonForm: function(fieldsObj){
        //Push the object: index and name
        this.fields.push(fieldsObj); 
        
        //Sort the fields
        let fieldSorted = this.fields.sort(this.dynamicSort('index'));
        
        this.fieldConcat = fieldSorted.map(function(elem){
			return elem.name;
		}).join(' > ');
    },

    //Process the type in events
    processEventTypeIn: function(event){
        if(!event.classList.contains('type-in-active')){
            let getType = event.getAttribute('type'),
                error_count = 0;

            if(event.value == ''){
                error_count++;
            }

            if(getType == 'checkbox'){
                if(!event.checked){
                    error_count++;
                }
            }

            if(getType == 'radio'){
                let getEventTarget = event.getAttribute('data-event-target'),
                    eventTargetLenthCheck = document.querySelectorAll(getEventTarget+' input[type="radio"]:checked').length;

                if(eventTargetLenthCheck <= 0){
                    error_count++; 
                } else {
                    let eventSelector = document.querySelectorAll(getEventTarget+' input[type="radio"]'),
                        eventSelectorLength = eventSelector.length;

                    for(let i=0; i < eventSelectorLength; i++){
                        eventSelector[i].classList.add('type-in-active');
                    }
                }
            }

            if(error_count == 0){
                if(getType != 'radio'){
                    event.classList.add('type-in-active');
                }

                //Trigger the dataLayer push
                this.dataLayerPush({
                    'dataEvent': 	event.getAttribute('data-event'),
                    'dataCategory': event.getAttribute('data-category'),
                    'dataAction': 	event.getAttribute('data-action'),
                    'dataLabel': 	event.getAttribute('data-label')
                });	

                //Abandonment form 
                if(this.abandonStatus === true){

                    this.processAbandonForm({
						'index': parseInt(event.getAttribute('data-event-index')),
						'name': event.getAttribute('data-event-fieldname')
                    });
                }
            }
        }
    },

    //Type in handlers
    typeInHandlers: function(param){
        let _this = this;

        for(let i=0; i < param.selectorInputsLength; i++){
            param.selectorInputs[i].addEventListener('keyup', function(event){
                _this.processEventTypeIn(param.selectorInputs[i]);
            });

            param.selectorInputs[i].addEventListener('change', function(event){
                _this.processEventTypeIn(param.selectorInputs[i]);
            });
        }
    },

    //Initialization for form type in
    formHandlers: function(param){
        if(param.abandonStatus === true){
            let selectorForm  = document.getElementById(param.formID),
                selectorInputs = selectorForm.querySelectorAll(param.typeInSelector),
                selectorInputsLength = selectorInputs.length;

            this.abandonStatus = param.abandonStatus;

            this.indexAssigner({
                selectorForm: selectorForm,
                selectorInputs: selectorInputs,
                selectorInputsLength: selectorInputsLength
            });

            this.typeInHandlers({
                selectorForm: selectorForm,
                selectorInputs: selectorInputs,
                selectorInputsLength: selectorInputsLength
            });
        }
    }
}

export default appGoogleTracking;