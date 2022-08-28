const ValidateForm = {

    //Function to check empty spaces
	isEmpty: function(str){
		var strRE = new RegExp();
		strRE.compile('^[\s ]*$','gi');
		return strRE.test(str);
    },
    
    //Use regex to validate the field value
	validateRegex: function(regExpression,val){
		var regEX = new RegExp(regExpression);
	
		if(regEX.test(val)){
            return true; 
		} else {
			return false;
		}
    },
    
    //Function to check empty space between characters - good for password
	checkEmptySpace: function(str){
		var check = str.length,
			space = 0;
		
		//Check all blank space
		for(var i=0; i<check; i++){
			if(str.charAt(i) == ' '){
				space++;
			}
		}
		
		if(space == 0){ return true; } else { return false; }
	},
	
	//Function to check special characters
	verifySpecialCharPassword: function(frmVal){
		var error = 0,
			val = frmVal,
			iChars = '!@$_-';  //Allow in password 
		
		for(var i=0; i<val.length; i++){
			if(iChars.indexOf(val.charAt(i)) != -1){
				error++;
			}
		}
		
		if(error == 0) { return true; } else { return false; }
    },
    
    //Function to check date if valid or not including leap year
	validateDate: function(fieldValue,delimeter){
		var parts = fieldValue.split(delimeter),
			day = parseInt(parts[0], 10),
			month = parseInt(parts[1], 10),
			year = parseInt(parts[2], 10);
		
		// Check the ranges of month and year
		if(year < 1000 || year > 3000 || month == 0 || month > 12){
			return false;
		}
		
		var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		
		if(month != 2){
			if(day > monthLength[month - 1]){
				return false;
			}
		} else {
			// Adjust for leap years
			if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
				monthLength[1] = 29;
			}
			// Check the range of the day
			return day > 0 && day <= monthLength[month - 1];
		}
		
		return true;
    },
    
    //Function to check the age - DD/MM/YYYY
	validateAge: function(fieldValue,age,delimeter){
		var age = (age == undefined)?'18':age;
	
		var parts = fieldValue.split(delimeter),
			getday = parseInt(parts[0], 10),
			getmonth = parseInt(parts[1], 10),
			getyear = parseInt(parts[2], 10);
			
		var date = new Date(),
			year = date.getFullYear() - getyear,		//Subtracting entered year from current year
			month = (date.getMonth() + 1) - getmonth,	//Subtracting entered month from current month
			days = date.getDate() - getday;  			//Subtracting entered day from current day
			
		 // If month is negative, means it's a year earlier - Decrement year by 1. Else if month is 0 and day is negative, means it's a year earlier - Decrement year by 1
        if(month < 0){
            year--;
        } else if(month == 0 && days < 0){
            year--;
        }
		
		// If customer's age is greater than or equal to certificate then age is valid, else it's invalid
		if(year >= age){ 
            return true;
        } else {
            return false;
        }
    },

    //Main validation process
	validateProcess: function(eventSelector){
        var checkRequire = eventSelector.getAttribute('data-require');
        
        if(checkRequire === 'true'){
            //Validation periquisites
            var getValue = eventSelector.value,
                getType  = eventSelector.getAttribute('data-type'),
                getID    = eventSelector.getAttribute('id'),
                getErrorTarget = eventSelector.getAttribute('data-error-target'),
                validError = 0;

            //Text - validate only on empty fields
            if(getType == 'text'){
                if(getValue == '' || this.isEmpty(getValue)){
                    this.error_message('error',eventSelector,getErrorTarget,eventSelector.getAttribute('data-required-message'));
                    validError++;
                } else {
                    this.error_message('good',eventSelector,getErrorTarget,'');
                }   
            }

            //regex - validate for regex
            if(getType == 'regex'){
                if(getValue == '' || this.isEmpty(getValue)){
                    this.error_message('error',eventSelector,getErrorTarget,eventSelector.getAttribute('data-required-message'));
                    validError++;
                } else if(!this.validateRegex(eventSelector.getAttribute('data-regex-pattern'),getValue)){
                    this.error_message('error',eventSelector,getErrorTarget,eventSelector.getAttribute('data-pattern-message'));
                    validError++;
                } else if(eventSelector.hasAttribute('data-date-min') ||  eventSelector.hasAttribute('data-date-max')){
                    const dateMinString = eventSelector.getAttribute('data-date-min');
                    const dateMaxString = eventSelector.getAttribute('data-date-max');
                    const dateMin = dateMinString && dateMinString.split(".").length > 2 ? new Date(dateMinString.split(".")[2], dateMinString.split(".")[1]-1, dateMinString.split(".")[0]) : null;
                    const dateMax = dateMaxString && dateMinString.split(".").length > 2 ? new Date(dateMaxString.split(".")[2], dateMaxString.split(".")[1]-1, dateMaxString.split(".")[0]) : null;
                    const dateValue = getValue.split(".").length > 2 ? new Date(getValue.split(".")[2], getValue.split(".")[1]-1, getValue.split(".")[0]) : null;
                    if(dateValue && dateMin && +dateMin > +dateValue){
                        this.error_message('error', eventSelector,getErrorTarget,eventSelector.getAttribute('data-date-message'));
                    }else if(dateValue && dateMax && +dateMax < +dateValue){
                        this.error_message('error', eventSelector,getErrorTarget,eventSelector.getAttribute('data-date-message'));
                    }else{
                        this.error_message('good',eventSelector,getErrorTarget,'');
                    }
                } else {
                    this.error_message('good',eventSelector,getErrorTarget,'');
                }
            }

            //select box - validate for dropdown list
			if(getType == 'ddl'){
                if(getValue == 'default'){
					this.error_message('error',eventSelector,getErrorTarget,eventSelector.getAttribute('data-required-message'));
					validError++;
				} else {
                    if(eventSelector.hasAttribute('data-custom-check')){
                        let customCondition = parseInt(eventSelector.getAttribute('data-custom-check'));

                        if(parseInt(getValue) <= customCondition){
                            this.error_message('error',eventSelector,getErrorTarget,eventSelector.getAttribute('data-custom-message'));
                        } else {
                            this.error_message('good',eventSelector,getErrorTarget,'');
                        }
                    } else {
                        this.error_message('good',eventSelector,getErrorTarget,'');
                    }
				}
            }

            //checkbox -validate for checkboxes
			if(getType == 'checkbox'){
                if(!eventSelector.checked){
					this.error_message('error',eventSelector,getErrorTarget,eventSelector.getAttribute('data-required-message'),getID);
					validError++;
				} else {
					this.error_message('good',eventSelector,getErrorTarget,'',getID);
				}
            }

            //Radio - validate for radio (related ones)
			if(getType == 'radio'){
                var getEventTarget = eventSelector.getAttribute('data-event-target');

                if(document.querySelectorAll(getEventTarget+' input[type="radio"]:checked').length <= 0){
					this.error_message('error',eventSelector,getErrorTarget,eventSelector.getAttribute('data-required-message'),getID);
                    validError++;
				} else {
                    this.error_message('good',eventSelector,getErrorTarget,'',getID);
				}
            }

            if(getType == 'file'){
                this.checkfileUpload(eventSelector);    //To check global status
            }

            const classes = Array.from(eventSelector.classList);
            if(classes.includes("notvalid")){
                validError++;
            }

            if(validError == 0){
				return true;
			} else {
				return false;
			}
        }
    },

    //Convert bytes to
    formatBytes: function(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        //return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    },

    //Function to check file by extension, size and mime type
    checkfileUpload: function(eventSelector){
        var getValue = eventSelector.value.toLowerCase(),
            //getExtension = getValue.substring(getValue.lastIndexOf('.')),
            eventButton = document.querySelector('.btn__container[for="file_to_upload"]'),
            regexFile = /([a-zA-Z0-9\(\)\s_\\.\-:])+(.png|.jpg|.jpeg|.pdf)$/,
            returnStatus = {
                status: true,
                error: 'null'
            };

        if(getValue !== '' && this.validateRegex(regexFile,getValue)){
            //Check file size and also if browser support file reader : IE11 and Edge must have support
            if(window.FileReader && window.Blob){
                //Check file size
                var files = eventSelector.files[0],
                    filesSize = files.size / 1000000;

                if(filesSize > 20){ //20MB
                    returnStatus.status = false;
                    returnStatus.error = 'filesize';
                } else {
                    //Check Mime types - jpg, png and pdf
                    var fileReader = new FileReader();

                    fileReader.onload = function(e){
                        var arr = (new Uint8Array(e.target.result)).subarray(0, 4),
                            header = '';

                        for(var i = 0; i < arr.length; i++){
                            header += arr[i].toString(16);
                        }
                        //console.log('File header: ' + header);

                        // Check the file signature against known types
                        var type = 'unknown';

                        switch (header) {
                            case '89504e47':
                                type = 'image/png';
                                console.log('image/png');
                                break;
                            case '47494638':
                                type = 'image/gif';
                                console.log('image/gif');
                                break;
                            case 'ffd8ffe0':
                            case 'ffd8ffe1':
                            case 'ffd8ffe2':
                                type = 'image/jpeg';
                                console.log('image/jpeg');
                                break;
                            case '25504446':
                                type = 'application/pdf';
                                console.log('image/pdf');
                                break;
                        }

                        //Assign status for file upload
                        let selectorSuccess = document.querySelector('.js-file-success'),
                            selectorError = document.querySelector('.js-file-error');

                        if(files.type !== type){
                            window.FILE_STATUS = false;
                            selectorError.innerHTML = eventSelector.getAttribute('data-format-error');
                            selectorError.classList.add('active');
                            selectorSuccess.classList.remove('active');
                            eventButton.classList.remove('btn--secondary-medow');
                        } else {
                            window.FILE_STATUS = true;
                            selectorSuccess.innerHTML = eventSelector.value.split('\\').pop().split('/').pop();
                            selectorSuccess.classList.add('active');
                            selectorError.classList.remove('active');
                            eventButton.classList.add('btn--secondary-medow');
                        }
                    };
                    
                    fileReader.readAsArrayBuffer(files);
                }
            } else {
                returnStatus.status = false;
                returnStatus.error = 'filereader';
                console.log('Browser does not support FileReader or Blob');
            } 
        } else {
            returnStatus.status = false;
            returnStatus.error = 'empty'; 
        }

         //Assign status for file upload
         let selectorSuccess = document.querySelector('.js-file-success'),
            selectorError = document.querySelector('.js-file-error');
            
        const isFileRequired = eventSelector.getAttribute("data-file-required");
        //Error message for empty file
        if(returnStatus.status === false && returnStatus.error === 'empty' && isFileRequired == "true"){
            selectorError.innerHTML = eventSelector.getAttribute('data-required-message');
            selectorError.classList.add('active');
            selectorSuccess.classList.remove('active');
            eventButton.classList.remove('btn--secondary-medow');
        }else if(isFileRequired == "false"){
            window.FILE_STATUS = true;
        }

        //Error message for file size
        else if(returnStatus.status === false && returnStatus.error === 'filesize'){
            selectorError.innerHTML = eventSelector.getAttribute('data-oversize-error');
            selectorError.classList.add('active');
            selectorSuccess.classList.remove('active');
            eventButton.classList.remove('btn--secondary-medow');
        }
    },

    //Function to validate fields
	validateField: function(formID){
        var selectorForm = document.getElementById(formID),
            _this = this;
            
        /*
            input elements : input[type=text], input[type=email], input[type=password], textarea 
            This require on blur selector
        */
        var selectorInputs = selectorForm.querySelectorAll('input[type=text], input[type=email], input[type=password], textarea'),
            selectorInputsLength = selectorInputs.length;

        for(let i=0; i < selectorInputsLength; i++){
            selectorInputs[i].addEventListener('blur', function(event){
                let targetElement = event.target || event.srcElement;
                _this.validateProcess(targetElement);
            });
        }

        /* 
            select elements
        */
        var selectorSelects = selectorForm.querySelectorAll('select'),
            selectorSelectsLength = selectorSelects.length

        for(let i=0; i < selectorSelectsLength; i++){
            selectorSelects[i].addEventListener('change', function(event){
                let targetElement = event.target || event.srcElement;
                _this.validateProcess(targetElement);
            });
        }

        /*
            File elements
        */
        var selectorFiles = selectorForm.querySelectorAll('input[type=file]'),
            selectorFilesLength = selectorFiles.length;

        for(let i=0; i < selectorFilesLength; i++){
            selectorFiles[i].addEventListener('change', function(event){
                let targetElement = event.target || event.srcElement;
                _this.validateProcess(targetElement);
            });
        }

        /*
            Checkbox elements
        */
        var selectorCheckboxes = selectorForm.querySelectorAll('input[type=checkbox]'),
            selectorCheckboxesLength = selectorCheckboxes.length;

        for(let i=0; i < selectorCheckboxesLength; i++){
            selectorCheckboxes[i].addEventListener('change', function(event){
                let targetElement = event.target || event.srcElement;
                _this.validateProcess(targetElement);
            });
        }

        /*
            Radio buttons elements
        */
        var selectorRadios = selectorForm.querySelectorAll('input[type=radio]'),
            selectorRadiosLength = selectorRadios.length;

        for(let i=0; i < selectorRadiosLength; i++){
            selectorRadios[i].addEventListener('change', function(event){
                let targetElement = event.target || event.srcElement;
                _this.validateProcess(targetElement);
            });
        }
    },

    //Function to validate form
	validateForm: function(formID){
        var error_counter = 0,
            selectorID = document.getElementById(formID);

        var selectorAll = selectorID.querySelectorAll('input[type=text], input[type=radio], input[type=checkbox], input[type=email], input[type=password], textarea, input[type=file], select'),
            selectorAllLength = selectorAll.length;

        for(let i=0; i < selectorAllLength; i++){
            // selectorAll[i] -> event
            if(selectorAll[i].getAttribute('data-require') === 'true'){
                if(!ValidateForm.validateProcess(selectorAll[i])){
                    error_counter++;
				}
            }
        }
        const errorFile = document.querySelector(".form-input__error.js-file-error.active");
        if(errorFile){
            error_counter++;
        }
        if(error_counter == 0){
			return true;
		} else {
			return false;	
		}
    },
    
    error_message: function(status,eventSelector,getErrorTarget,errorMessage,getID){
        let getInputType = null,
            selectorTarget = null,
            showErrorSelector =  document.querySelector(getErrorTarget);

        //console.log(getErrorTarget+' - '+errorMessage);

        if(getID !== undefined){
            getInputType = document.getElementById(getID).getAttribute('type');
        }

        if(getInputType == 'checkbox'){
            selectorTarget = document.querySelector('.custom-inputs[for="'+getID+'"]');
        } else if(getInputType == 'radio'){
            selectorTarget = document.querySelector('.content-purchase__inputs.radiogroups');
        }

		if(status == 'error'){
            eventSelector.classList.remove('valid');
            eventSelector.classList.add('notvalid');

            if(getID !== undefined){
                selectorTarget.classList.add('notvalid');
            }

            //Show error message
           if(showErrorSelector){
                showErrorSelector.innerHTML = errorMessage;
            }
		} else {
            eventSelector.classList.remove('notvalid');
            eventSelector.classList.add('valid');

            if(getID !== undefined){
                selectorTarget.classList.remove('notvalid');
            }

             //Hide error message
            if(showErrorSelector){
                 showErrorSelector.innerHTML = '';
            }
		}
	}
}

export default ValidateForm;