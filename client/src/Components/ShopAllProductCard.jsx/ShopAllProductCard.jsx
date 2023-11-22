import React from 'react'
import { useSelector } from 'react-redux';
import "./ShopAllProductCard.css";


function ShopAllProductCard({ filteredProducts ,addToWishlist ,removeWishlistItem}) {
  const wishlistState = useSelector((state)=>state.wishlistState)
  const goToSingleProductPage = (productId) => {
    window.location.href = `/v1/productPage/id:${productId}`
  }
  return (
    <div className='ShopAllProductCard-row'>
      {filteredProducts ? filteredProducts.map((product, index) => {
        const isProductInWishlist = wishlistState && wishlistState.wishlistItems ? wishlistState.wishlistItems.product.some(
          (item) => item.id === product.id
        ) : "";
        return (
          <div className="ShopAllProductCard-single-product" key={index}>
            <div className="ShopAllProductCard-single-product-img">
              <img src={product.imageOne} alt="" onClick={()=>goToSingleProductPage(product.id)}/>
              {isProductInWishlist ? 
                    <i class="fas fa-heart" style={{ color: "#fb0e3d" }} onClick={()=>removeWishlistItem(product)}></i> :
                    <i class="fas fa-heart" style={{color:"#edeff2"}} onClick={() => addToWishlist(product)}></i> }
            </div>
            <div className="ShopAllProductCard-single-product-details">
              <div className="ShopAllProductCard-single-product-name">
                <p>{product.productName}</p>
                <p>{product.productBrand}</p>
              </div>
              <div className="ShopAllProductCard-single-product-price">
                <p>₹{product.productPrice - Math.round(product.productDiscount/100*product.productPrice)}</p>
                <p>₹{product.productPrice}</p>
                <p>{product.productDiscount}% off</p>
              </div>
            </div>
          </div>
        )
      }) : ""}

    </div>
  )
}

export default ShopAllProductCard
