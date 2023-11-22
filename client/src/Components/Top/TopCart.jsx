import React from 'react'
import Tdata from "./Tdata"
import Slider from "react-slick";


function TopCart() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Slider {...settings}>
        {Tdata.map((value, index) => {
          return (
            <div key={index}>
              <div className='box product'>
                <div className='nametop d_flex'>
                  <span className='tleft'>{value.para}</span>
                  <span className='tright'>{value.desc}</span>
                </div>
                <div className='img'>
                  <img src={value.cover} alt='' />
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </>

  )
}

export default TopCart
