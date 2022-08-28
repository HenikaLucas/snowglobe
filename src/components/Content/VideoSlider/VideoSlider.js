import { useState } from 'react';
import React from 'react';
import Slider from 'react-slick';
const VideoSlider = () => {

  const data = [0,1,2,3,4,5,6,7,8,9,10]

  const [imageIndex, setImageIndex] = useState(0);
  const settings = {
    infinite: true,
    lazyload: true,
    speed:300,
    slidesToShow:3,
    centerMode:true,
    centerPadding:0,
    beforeChange: (current, next) => setImageIndex(next)
  }
    

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {data.map((img, idx) =>(
          <div className={idx===imageIndex? "slide activeSlide":"slide"}>
            <video controls >
                <source src="#" type="video/mp4"/>
            </video>
          </div>
        )
        )}
      </Slider>
    </div>
  )
}

export default VideoSlider
