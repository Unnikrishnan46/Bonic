import React,{useState} from 'react'
import FlashCard from './FlashCard'
import "./Style.css";


function FlashDeals({ productItems ,products,addToWishlist,removeWishlistItem}) {

    return (
        <>
            <section className='flash'>
                <div className='container'>
                    <div className='heading f_flex'>
                        <i className='fa fa-bolt'></i>
                        <h1>Flash Deals</h1>
                    </div>
                    <FlashCard productItems={productItems} products={products} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>
                </div>
            </section>
        </>
    )
}

export default FlashDeals
