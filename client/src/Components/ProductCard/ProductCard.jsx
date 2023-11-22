import React from 'react';
import { useSelector } from 'react-redux';
import "./ProductCard.css";


function ProductCard({similarProducts,isProductInWishlist,addToWishlist,removeWishlistItem}) {
    const goToSingleProductPage = (productId) => {
        window.location.href = `/v1/productPage/id:${productId}`
      }
    return (
        <div className='ProductCard-main'>
            <div className='ProductCard-img-container'>
                <span className='ProductCard-discount'>{similarProducts.productDiscount}% Off</span>
                <img className='ProductCard-img' src={similarProducts.imageOne} alt='' />
                <div className='ProductCard-wishlist-icon'>
                {isProductInWishlist ? 
                    <i class="fas fa-heart" style={{ color: "#fb0e3d" }} onClick={()=>removeWishlistItem(similarProducts)}></i> :
                    <i class="fas fa-heart" style={{color:"#edeff2"}} onClick={() => addToWishlist(similarProducts)}></i> }
                    {/* <i class="fas fa-heart" style={{color:"#edeff2"}}></i> */}
                    {/* <i class="fas fa-heart" style={{ color: "#fb0e3d" }}></i> */}
                </div>
            </div>
            <div className='ProductCard-details'>
                <h3 className='ProductCard-prod-name' onClick={()=>{goToSingleProductPage(similarProducts.id)}}>{similarProducts.productName}</h3>
                <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                </div>
                <div className="ProductCard-bottom">
                    <div className='ProductCard-price-details'>
                        <h4>₹{similarProducts.productPrice-Math.round(similarProducts.productDiscount/100*similarProducts.productPrice)}.00 </h4>
                        <h6 style={{ textDecoration: "line-through" }} className='discount-price-lined'>₹{similarProducts.productPrice}.00</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
