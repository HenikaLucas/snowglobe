import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import parse from 'html-react-parser';
import appGoogleTracking from '../../../modules/googletracking';
import SwiperCore, { Navigation, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';     // Import Swiper React components
import 'swiper/swiper.scss';    // Import Swiper styles
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, EffectFade]);

class SliderContent extends Component {

    render() {

        const { t, classModifier } = this.props;

        let sliderObj = t('Page.Home.slider', { returnObjects: true });

        let swiperSlides = sliderObj.map((obj) => {
            return (
                <SwiperSlide key={obj.index}>
                    <div className="content-slider">
                        <div className="content-slider__header">{obj.header}</div>
                        <div className="content-slider__description">{parse(obj.text)}</div>
                        <div className={'content-slider__image '+obj.index}>
                            <img src={obj.image} alt="prodcut image" />
                        </div>
                        <div className="content-slider__btn">
                            <a href={obj.link} target="_blank" rel="noopener noreferrer" data-event="button-click" data-category="Click Action" data-action="Carousel button" data-label="Zum shop" onClick={appGoogleTracking.processEventCTA}>
                                <div className="btn__container btn--primary btn--hover">
                                    <span className="btn__text">{obj.linkText}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
            );
        });

        return (
            <div className={!!classModifier ? `content-slider-wrapper ${classModifier}` : "content-slider-wrapper"}>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: false }}
                    effect="fade"
                    /*onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}*/
                    onSlideNextTransitionStart={() => {
                        appGoogleTracking.dataLayerPush({
                            'dataEvent': 	'info-click',
                            'dataCategory': 'Informational Action',
                            'dataAction': 	'Carousel Click',
                            'dataLabel': 	'Right'
                        });
                    }}
                    onSlidePrevTransitionStart={() => {
                        appGoogleTracking.dataLayerPush({
                            'dataEvent': 	'info-click',
                            'dataCategory': 'Informational Action',
                            'dataAction': 	'Carousel Click',
                            'dataLabel': 	'Left'
                        });
                    }}
                >
                    {swiperSlides}
                </Swiper>
          </div>
        );
    }
}

export default withTranslation()(SliderContent);