import React from 'react';
import parse from 'html-react-parser';

class Checkbox extends React.Component {
    constructor() {
        super();

        this.displayCheckMark = this.displayCheckMark.bind(this);
    }

    render() {
        let { text, id, name, onChangeHandler, required, errorMessage } = this.props;
        name = !!name ? name : `name-${id}`;


        
        return (
            <div className = "form-container" id={name}>
                <div className = "input-container">
                    <label className = "custom-inputs" htmlFor = { id }>
                        <input type = "checkbox" 
                            className = "js-event-type-in js-event-ab"
                            ref = { check => this.reference = check}
                            id = { id } 
                            name = { name } 
                            data-type = "checkbox"
                            data-require = { required } 
                            data-required-message = { errorMessage }
                            data-event-fieldname = { name }
                            data-error-target = {`#error-${id}`}
                            data-event = "form-click" 
                            data-category = "Form Action" 
                            data-action = { name } 
                            data-label = "Type In" 
                            onChange = { (event) => { onChangeHandler(event, this.reference) }  } />
                        
                        <span className = "text-content">
                            { parse( text ) }
                        </span>
                        
                        {this.displayCheckMark()}

                        <span id={`error-${id}`} className="error-declaration form-input__error"></span>
                    </label>
                </div>
            </div>
        );
    }

    displayCheckMark(){
        let { isForFooter } = this.props;
        
        if(isForFooter){
            return (
                <span className = "checkmark" onClick={()=>{this.reference.click();}}></span>
            );
        }

        return (
            <span className = "checkmark"></span>
        );
    }
    
}

export default Checkbox;