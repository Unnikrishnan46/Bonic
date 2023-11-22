import React from 'react'
import { useSelector } from 'react-redux';

function ShopCard({products,addToWishlist,removeWishlistItem}) {
  const wishlistState = useSelector((state)=>state.wishlistState)
  const goToSingleProductPage = (productId) => {
    window.location.href = `/v1/productPage/id:${productId}`
  }
  return (
    <>
      {wishlistState.wishlistItems && products.map((shopItems, index) => {
        const isProductInWishlist = wishlistState.wishlistItems.product.some(
          (item) => item.id === shopItems.id
        );
        return (
          <div className='box' key={index}>
            <div className='product mtop'>
              <div className='img'>
                <span className='discount'>{shopItems.discount}% Off</span>
                <img src={shopItems.imageOne} alt='' />
                <div className='product-like'>
                {isProductInWishlist ? 
                    <i class="fas fa-heart" style={{ color: "#fb0e3d" }} onClick={()=>removeWishlistItem(shopItems)}></i> :
                    <i class="fas fa-heart" style={{color:"#edeff2"}} onClick={() => addToWishlist(shopItems)}></i> }
                </div>
              </div>
              <div className='product-details'>
                <h3 className='shop-card-h3'>{shopItems.productName}</h3>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                </div>
                <div className='price'>
                  <h4>${shopItems.productPrice}.00 </h4>
                  <button>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ShopCard
