class FooterAccordion {
    constructor() {
        this.init();
    }

    eventHandlers() {
        //Accordion Handler : Pure JS on multiple elements
        const elementSelector = document.querySelectorAll('.js-accordion'),
            elementSelectorLength = elementSelector.length;

        for(let i=0; i < elementSelectorLength; i++){
            elementSelector[i].addEventListener('click', function(event){
                if(window.innerWidth <= 1024){
                    event.preventDefault();
                    let targetElement = event.target || event.srcElement,
                        getTargetSelector = targetElement.getAttribute('data-target'),
                        setTargetSelector = document.querySelector('.js-footer-accordion-content[data-target-child="'+getTargetSelector+'"]');

                    if(!targetElement.classList.contains('footer__control--open')){
                        //Add open element
                        targetElement.classList.add('footer__control--open');
                        setTargetSelector.classList.add('footer__links--open');
                    } else {
                        //Close open element
                        targetElement.classList.remove('footer__control--open');
                        setTargetSelector.classList.remove('footer__links--open');
                    }
                }
                
            });
        }
        
    }

    init() {
        this.eventHandlers();
    }
}

export default FooterAccordion;