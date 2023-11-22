import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import NeedLogin from '../NeedLogin/NeedLogin';
import { firestore } from '../../Firebase/Firebase';
import { updateDoc, doc } from "firebase/firestore";
import "./Wishlist.css";

function Wishlist({getUserWishlist}) {
  const userState = useSelector((state) => state.userState);
  const WishlistState = useSelector((state) => state.wishlistState);
  const dispatch = useDispatch()


  const removeWishlistItem = async (product) => {
    const wishlistRef = doc(firestore, "wishlist", WishlistState.wishlistItems.id);
    var filtered = WishlistState.wishlistItems.product.filter(function (value, index, arr) {
      return value.productId !== product.productId;
    });
    await updateDoc(wishlistRef, { product: filtered }).then(() => {
      getUserWishlist()
    }).catch((error) => {
      console.log(error)
    })
  }

  if (!userState.userData) {
    return (
      <NeedLogin />
    )
  }
  return (
    <div className='Wishlist-main-container'>
      <div className="Wishlist-sub-container">
        <div className="Wishlist-header">
          <p>My Wishlist ({WishlistState.wishlistCount})</p>
        </div>
        {WishlistState.wishlistItems.product ? WishlistState.wishlistItems.product.map((product, index) => {
          return (
            <div className="Wishlist-single-product-div" key={index}>
              <div className="Wishlist-single-product-img">
                <img src={product.imageOne} alt="" />
                <div className="Wishlist-single-product-content">
                  <div className="Wishlist-single-product-content-first">
                    <p>{product.productName}</p>
                  </div>
                  <div className="Wishlist-single-product-content-second">
                    <span>4.3<i class="fas fa-star"></i></span>
                  </div>
                  <div className="Wishlist-single-product-content-third">
                    <p>₹{product.productPrice - Math.round(product.productDiscount/100 * product.productPrice)}</p>
                    <p>₹{product.productPrice}</p>
                    <p>{product.productDiscount}% off</p>
                  </div>
                </div>
              </div>
              <div className="Wishlist-single-product-right">
                <i class="fas fa-trash" onClick={()=>{removeWishlistItem(product)}}></i>
              </div>
            </div>
          )
        }) : ""}

      </div>
    </div>
  )
}

export default Wishlist
