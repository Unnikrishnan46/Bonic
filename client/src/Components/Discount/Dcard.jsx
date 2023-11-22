import React from 'react'
import Slider from "react-slick";
import "./Style.css"

function Dcard({products}) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  };
  return (
    <>
      <Slider {...settings}>
        {products.map((value, index) => {
          return (
            <div  key={index}>
              <div className='box product dcard-div'>
                <div className='Dcard-img'>
                  <img src={value.imageOne} alt='' />
                </div>
                <h4>{value.productName}</h4>
                <span>{value.ProductPrice}</span>
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

export default Dcard
