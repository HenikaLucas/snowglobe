/**
 * Creates DOM control for hamburger menu (mobile). Needs a selector for Menu and the target Content.
 * @param menuSelector
 * @param contentSelector
 * @param modifier CANNOT BE NULL
 */

class hamburgerMenu {
    constructor (options){
        this.menuSelector = document.querySelector(options.menuSelector);
        this.close = document.querySelector(options.close);
        this.contentSelector = document.querySelector(options.contentSelector);
        this.modifier = options.modifier;
        this.preventScroll = options.preventScroll || true;
        this.isOpen = false;

        if(this.menuSelector !== null && this.contentSelector !== null)
            this.menuSelector.addEventListener('click', (event) => this.toggleMenu(event))
        else
            console.log(`%cERR-HM: ${options.menuSelector} & ${options.contentSelector} is absent from DOM`, 'color: red');

        if(this.close !== null)
            this.close.addEventListener('click', (e) => this.closeMenu(e))
        else
            console.log(`%cERR-HM: ${options.close} is absent from DOM`, 'color: red');

        window.addEventListener('resize', (e) => {
            let width = document.body.clientWidth,
                bigScreen = 820;

            if( width > bigScreen && this.isOpen == true) {
                // * close mobile menu when screen is > 820 px
                this.closeMenu();
            }
        })
    }

    toggleMenu(e){
        e.preventDefault();

        if(this.contentSelector.classList.contains(this.modifier)){
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    closeMenu(e) {
        this.isOpen = false;

        this.contentSelector.classList.remove(this.modifier);

        this.removeModifyHead();

        document.querySelector('.js-pull-animate').style.cssText = "";
        document.querySelector('.header__logo').style.cssText = "display:none";
    }

    openMenu(e) {
        this.isOpen = true;

        this.contentSelector.classList.add(this.modifier);

        this.addModifyHead();

        document.querySelector('.js-pull-animate').style.cssText = "opacity: 1";
        document.querySelector('.header__logo').style.cssText = "display:block";
    }

    addModifyHead() {
        let heads = document.querySelectorAll('.header__head');

        for(let i = 0; i < heads.length; i++) {
            let head = heads[i];

            head.classList.add('header__head--lilac');
        }
    }

    removeModifyHead() {
        let heads = document.querySelectorAll('.header__head');

        for(let i = 0; i < heads.length; i++) {
            let head = heads[i];

            head.classList.remove('header__head--lilac');
        }
    }

}

export default hamburgerMenu;