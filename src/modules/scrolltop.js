class Scrolltop {
    constructor(params) {
        this.Selector = document.querySelector(params.selector);
        this.HeightActive = params.heightActive;
        
        // this.init();
    }

    eventHandlers() {
        // this.Selector.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     this.scrollToTop(500);  
        // });

        // window.addEventListener('scroll', (e) => { 
        //     e.preventDefault();
        //     this.sticky();
        // });
    }

    sticky() {
        let scrollY = window.scrollY || document.documentElement.scrollTop; // ! scrollY not supported by IE

        if(scrollY > this.HeightActive){
            this.Selector.style.opacity = '1';
        } else {
            this.Selector.style.opacity = '0';
        }
    }

    scrollToTop(scrollDuration) {
        var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

        if(isIE11){
            var scrollStep = -document.documentElement.scrollTop / (scrollDuration / 15),
                scrollInterval = setInterval(function(){
                if ( document.documentElement.scrollTop != 0 ) {
                    window.scrollBy( 0, scrollStep );
                }
                else clearInterval(scrollInterval); 
            },15);
        } else {
            var scrollStep = -window.scrollY / (scrollDuration / 15),
                scrollInterval = setInterval(function(){
                if ( window.scrollY != 0 ) {
                    window.scrollBy( 0, scrollStep );
                }
                else clearInterval(scrollInterval); 
            },15);
        }
    }

    init() {
        this.eventHandlers();
        // this.sticky();
    }
}

export default Scrolltop;