import React, { useState } from 'react'
import Slider from "react-slick";
import { useSelector } from 'react-redux';

const NextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="control-btn" onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="control-btn" onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}

function FlashCard({ products, addToWishlist ,removeWishlistItem}) {
  const wishlistState = useSelector((state)=>state.wishlistState)
  console.log("check ",wishlistState.wishlistItems);
  const goToSingleProductPage = (productId) => {
    window.location.href = `/v1/productPage/id:${productId}`
  }

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
        {products ? products.map((productItems, index) => {
          const discountedPrice = productItems.productPrice - Math.round((productItems.productDiscount / 100) * productItems.productPrice);
          let isProductInWishlist;
          if(wishlistState.wishlistItems){
            isProductInWishlist= wishlistState?.wishlistItems.product.some(
              (item) => item.id === productItems.id
            );
          }
          // const isProductInWishlist = wishlistState?.wishlistItems.product.some(
          //   (item) => item.id === productItems.id
          // );
          return (
            <div className='box' key={index}>
              <div className='product mtop' style={{ maxHeight: "40rem", minHeight: "20rem" }}>
                <div className='img'>
                  <span className='discount'>{productItems.productDiscount}% Off</span>
                  <img style={{ maxWidth: "100%", height: "auto" }} src={productItems.imageOne} alt='' onClick={() => { goToSingleProductPage(productItems.id) }} />
                  <div className='product-like'>
                    
                    {isProductInWishlist ? 
                    <i class="fas fa-heart" style={{ color: "#fb0e3d" }} onClick={()=>removeWishlistItem(productItems)}></i> :
                    <i class="fas fa-heart" style={{color:"#edeff2"}} onClick={() => addToWishlist(productItems)}></i> }
                     
                  </div>
                </div>
                <div className='product-details' onClick={() => { goToSingleProductPage(productItems.id) }}>
                  <h3 className='flashProductName'>{productItems.productName}</h3>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
                  <div className="bottom-flash-card">
                    <div className='price-flash-card'>
                      <h4>₹{discountedPrice}.00 </h4>
                      <h6 style={{ textDecoration: "line-through" }} className='discount-price-lined'>₹{productItems.productPrice}.00</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }) : ""}
      </Slider>
    </>
  )
}

export default FlashCard
