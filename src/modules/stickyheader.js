class StickyHeader {
    /**
     * @param headerSelector - Header that should be made sticky
     * @param contentSelector - Content to hide when page is scrolled (if any)
     * @param iconSelector - Icon to display when content is hidden (if any)
     */
    constructor (options) {
        this.headerSelector = (document.querySelector(options.headerSelector) !== null) ? document.querySelector(options.headerSelector) : null;
        this.contentSelector = (document.querySelector(options.contentSelector) !== null) ? document.querySelector(options.contentSelector) : null;
        this.iconSelector = (document.querySelector(options.iconSelector) !== null) ? document.querySelector(options.iconSelector) : null;

        if(this.headerSelector !== null)
            window.addEventListener('scroll', (e) => { 
                e.preventDefault();
                this.sticky()
            });
        else
            console.log(`%cERR-SH: ${options.headerSelector} is absent from the DOM`, 'color: red');

        if(this.iconSelector !== null)
            this.iconSelector.addEventListener('click', (e) => {
                e.preventDefault();
                this.disableSticky() 
            });
    }

    sticky() {
        let scrollY = window.scrollY || document.documentElement.scrollTop; // ! scrollY not supported by IE

        this.headerSelector.style.cssText = "";

        if(scrollY > 100){
            // prevent header to get into state sticky when Search layer is displayed
            if(document.querySelector('.search--show') === null)
                this.headerSelector.classList.add('header-md--sticky');

            this.headerSelector.classList.add('header-md--opaque');
            document.querySelector('.header__logo').style.cssText = "display:block";


            /*if(this.contentSelector !== null) {
                this.contentSelector.classList.add('header-md--hide');
                
                if(this.iconSelector !== null && document.querySelector('.search--show') === null){
                    // prevent hamburger button to be displayed when Search layer is displayed
                    this.iconSelector.style.cssText ='opacity: 1; z-index: 1';
                }
            }*/

        } else {
            if(this.contentSelector !== null) {
                this.contentSelector.classList.remove('header-md--hide');

                /*if(this.iconSelector !== null){
                    this.iconSelector.style.cssText ='';
                }*/
            }
            document.querySelector('.header__logo').style.cssText = "display:none";
            this.headerSelector.classList.remove('header-md--sticky');
            this.headerSelector.classList.remove('header-md--opaque');
        }
    }

    disableSticky() {
        this.headerSelector.classList.remove('header-md--sticky');
        this.iconSelector.style.cssText ='';
    }
}

export default StickyHeader;