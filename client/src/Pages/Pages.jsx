import React, { useEffect } from 'react'
import Home from '../Components/MainPages/Home'
import FlashDeals from '../Components/FlashDeals/FlashDeals'
import TopCate from '../Components/Top/TopCate'
import Newarraivals from '../Components/Newarraivals/Newarraivals'
import Discount from '../Components/Discount/Discount'
import Shop from '../Components/Shop/Shop'
import Announcement from '../Components/Announcement/Announcement'
import Wrapper from '../Components/Wrapper/Wrapper'
import Footer from '../Components/Footer/Footer'
import MainPageLoader from '../Components/Loader/MainPageLoader'


function Pages({ productItems, addToCart, cartItem, shopItems, userData, products ,addToWishlist ,removeWishlistItem}) {


  if (!products) {
    return (
      <MainPageLoader />
    )
  }

  return (
    <>
      <Home cartItem={cartItem} userData={userData} />
      <FlashDeals productItems={productItems} addToCart={addToCart} products={products} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>
      <TopCate />
      <Newarraivals products={products}/>
      <Discount products={products}/>
      {/* <Shop shopItems={shopItems} addToCart={addToCart} addToWishlist={addToWishlist} products={products} removeWishlistItem={removeWishlistItem}/> */}
      <Announcement />
      <Wrapper />
      <Footer />
    </>
  )
}

export default Pages
