const _MATH = {
    RoundUp: (number, nextInc = 5) => {
        try {
            var increment = nextInc,
                rounded = Math.round(number);
            var partieEntiere = Math.trunc(number);
            var partieDecimale = number - partieEntiere;

            if(rounded > 0) {
                if(rounded % increment > 0 || (partieDecimale < 0.5 && partieDecimale !== 0)) {
                    return rounded += increment - (rounded % increment);
                }
                return rounded;
            }
            throw 'Something went wrong'
            
        } catch(e) {
            return 0;
        }
    }
}

export default _MATH;