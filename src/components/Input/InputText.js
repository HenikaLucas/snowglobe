import React from 'react';

class InputText extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { label, id, type, required, placeholder } = this.props;
        return (
            <div className="input-container">
                <div className="form-input__container active js-datepicker-receipt">
                    <label className="form-input__label" htmlFor={id}>{label}</label>
                    <input className="form-input__input js-event-type-in js-event-ab" 
                        ref={ input => this._TextInput = input}
                        type={!!type ? type : "text"} 
                        name={id} 
                        id={id} 
                        placeholder={placeholder} 
                        autoComplete="off"
                        data-require={required} 
                        data-type="regex" 
                        data-error-target="#error-receipt_date" 
                        data-regex-pattern="^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$" 
                        data-required-message="Receipt date is required." 
                        data-pattern-message="Receipt date is not valid." 
                        data-event-fieldname="Receipt date" 
                        data-event="form-click" 
                        data-category="Form Action" 
                        data-action="Receipt date" 
                        data-label="Type In" />
                </div>
            </div>
        );
    }
}

export default InputText;