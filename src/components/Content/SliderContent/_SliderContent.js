import React, { Component } from 'react';
/* Import Carousel */
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const sliderModel = [
    '/resources/images/sliders/slider-1.png',
    '/resources/images/sliders/slider-2.png',
    '/resources/images/sliders/slider-3.png',
    '/resources/images/sliders/slider-4.png',
    '/resources/images/sliders/slider-5.png'
];

class SliderContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            slides: [
                (<img src="/resources/images/sliders/slider-1.png" alt="slider 1" />),
                (<img src="/resources/images/sliders/slider-2.png" alt="slider 2" />),
                (<img src="/resources/images/sliders/slider-3.png" alt="slider 3" />),
                (<img src="/resources/images/sliders/slider-4.png" alt="slider 4" />),
                (<img src="/resources/images/sliders/slider-5.png" alt="slider 5" />)
            ]
        }

        this.onchange = this.onchange.bind(this);
    }

    onchange(value) {
        this.setState({ value });
    }

    componentDidMount(){
        this.onchange = this.onchange.bind(this);
    }

    render() {

        return (
            <div className="s-content-slider__container">
                <Carousel
                    value={this.state.value}
                    slides={this.state.slides}
                    onChange={this.onchange}
                    arrows
                    clickToChange
                />
                 <Dots value={this.state.value} onChange={this.onchange} number={this.state.slides.length} />
            </div>
        );
    }
}

export default SliderContent;