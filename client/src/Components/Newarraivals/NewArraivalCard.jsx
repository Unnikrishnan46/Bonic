import React from 'react'
import "./Style.css";
function NewArraivalCard({products}) {
    const goToSingleProductPage = (productId) => {
        window.location.href = `/v1/productPage/id:${productId}`
      }
    return (
        <div className='NewArraivalCard'>
            {products.map((product, index) => {
                return (
                    <div className="NewArraivalCard-single-card" key={index} onClick={() => { goToSingleProductPage(product.id) }}>
                        <div className="NewArraivalCard-single-card-img">
                            <img src={product.imageOne} alt="" />
                        </div>
                        <div className="NewArraivalCard-single-card-details">
                        <h4>₹{product.productPrice-Math.round(product.productDiscount/100*product.productPrice)}.00 </h4>
                        <h6 style={{ textDecoration: "line-through" }} className='discount-price-lined'>₹{product.productPrice}.00</h6>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default NewArraivalCard
