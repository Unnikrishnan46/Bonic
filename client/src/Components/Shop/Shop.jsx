import React from 'react'
import Catg from './Catg'
import ShopCard from './ShopCard'
import "./Style.css"
function Shop({shopItems,addToCart,addToWishlist,products,removeWishlistItem}) {
    return (
        <>
            <section className='shop background'>
        <div className='container d_flex'>
          <Catg />

          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Mobile Phones</h2>
              </div>
              <div className='heading-right row '>
                <span>View all</span>
                <i class="fas fa-caret-right"></i>
              </div>
            </div>
            <div className='product-content  grid1'>
              <ShopCard addToCart={addToCart} shopItems={shopItems} addToWishlist={addToWishlist} products={products} removeWishlistItem={removeWishlistItem}/>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}

export default Shop
