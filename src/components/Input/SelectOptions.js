import React from 'react';
class SelectOptions extends React.Component {

    constructor() {
        super();
    }

    render() {
        let { optionsList, defaultVal, label, id, required } = this.props;
        
        console.log(optionsList)
        return (
            <div className="form-input__container dropdown-input__container form-input__dropdown">
                <select className="form-input__input js-event-type-in js-event-ab" 
                    type="text" 
                    name={id} 
                    id={id} 
                    data-require={required} 
                    placeholder={defaultVal}
                    data-type="ddl" 
                    data-error-target={`#error-${id}`}
                    data-required-message="" 
                    data-event-fieldname="" 
                    data-event="form-click" 
                    data-category="Form Action" 
                    data-action="" 
                    data-label="Type In">

                    <option value="default">
                        {defaultVal}
                    </option>
                    {
                        optionsList.map( (item, index) => {
                            let { Value, Display } = item;

                            return (
                                <option key={index} value={Value}>{Display}</option>
                            )
                        })
                    }
                </select>
                <label className="form-input__label" htmlFor={id}>{label}</label>
                <span id={`error-${id}`} className="form-input__error active"></span>
            </div>
        );
    }
}

export default SelectOptions;