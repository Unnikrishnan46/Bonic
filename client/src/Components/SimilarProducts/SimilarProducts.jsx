import React from 'react'
import "./SimilarProducts.css";
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';


function SimilarProducts({ similarProducts,addToWishlist,removeWishlistItem}) {
    const wishlistState = useSelector((state)=>state.wishlistState)
    return (
        <div className="similar-products-main-container">
            <div className="similar-products-heading">
                <h2>Similar products</h2>
            </div>
            <div className="similar-products-row">
                {similarProducts ? similarProducts.map((similarProducts, index) => {
                    const isProductInWishlist = wishlistState.wishlistItems ? wishlistState.wishlistItems.product.some(
                        (item) => item.id === similarProducts.id
                      ) : "";
                    return (
                        <ProductCard similarProducts={similarProducts} key={index} isProductInWishlist={isProductInWishlist} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>
                    )
                }) : ""}

            </div>
        </div>
    )
}

export default SimilarProducts
