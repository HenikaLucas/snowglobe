import React, {useState} from 'react'
import MeedoenSocial from '../MeedoenContent/MeedoenSocial'

const MeedoenForm = (props) => {
  const [submitted, setSubmitted] = useState(false)
  const submit = (e) => {
    e.preventDefault();
    setSubmitted(submitted?false:true);
  }

  let RenderHeading =
    props.heading !== undefined && props.heading !== null ? (
      <h1>{props.heading}</h1>
    ) : null
  let RenderBgDesktop =
    props.bgDesktop !== undefined && props.bgDesktop !== null
      ? props.bgDesktop
      : null
  let RenderBgMobile =
    props.bgMobile !== undefined && props.bgMobile !== null
      ? props.bgMobile
      : null
  return (
    <div className="s-content-title meedoen">
        {RenderHeading}
        <div className='container'>
          <div className='left-offset'>
          <picture>
            <source srcSet={RenderBgDesktop} media="(min-width: 1024px)" />
            <source srcSet={RenderBgDesktop} media="(min-width: 481px)" />
            <source srcSet={RenderBgMobile} media="(min-width: 200px)" />
            <img
              className="meedoen-form-image"
              src={RenderBgDesktop}
              alt="background"
            />
          </picture>
        </div>
        <div className="right-offset">
            <div className={submitted? 'section-top disabled' : 'section-top'}>
            <form action="">
              <h3 className="meedoen-form-content-right-stap">
                Stap 1. Inschrijven
              </h3>
              <div className="meedoen-form-content-right-input">
                <input type="text" name="" id="" placeholder="Gebruikersnaam*" />
              </div>
              <div className="meedoen-form-content-right-input">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Telefoonnummer*"
                />
              </div>
              <div class="form-container" id="name-accepteer">
                <div class="input-container">
                  <label class="custom-inputs" for="accepteer">
                    <input
                      type="checkbox"
                      class="js-event-type-in js-event-ab"
                      id="accepteer"
                      name="name-accepteer"
                      data-type="checkbox"
                      data-event-fieldname="name-accepteer"
                      data-error-target="#error-accepteer"
                      data-event="form-click"
                      data-category="Form Action"
                      data-action="name-accepteer"
                      data-label="Type In"
                    />
                    <span class="text-content">
                      Accepteer actievoorwaarden*
                    </span>
                    <span class="checkmark"></span>
                    <span
                      id="error-accepteer"
                      class="error-declaration form-input__error"
                    ></span>
                  </label>
                </div>
              </div>
              <div className='meedoen-form-button'>
                <button onClick={submit}>Inschrijven</button>
              </div>
            </form>
            </div>
            <div className={submitted? 'section-bottom' : 'section-bottom disabled'}>
              <h3 className="meedoen-form-content-right-stap">
              Stap 2. Upload jouw creatie met #milkasnowglobe, tag MilkaNL en win!
              </h3>
              <MeedoenSocial/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MeedoenForm
