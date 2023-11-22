import React, { useEffect, useState } from 'react'
import { firestore } from "../../Firebase/Firebase"
import { doc, getDoc } from 'firebase/firestore'
import MainPageLoader from '../Loader/MainPageLoader';
import "./OrderSuccessPage.css";

function OrderSuccessPage() {

    const [orderData, setOrderData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    console.log(orderData)

    const getOrderData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const refrenceId = urlParams.get("reference_id");
        const docRef = doc(firestore, "orders", refrenceId);
        await getDoc(docRef).then((querySnapshot) => {
            setOrderData(querySnapshot.data())
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getOrderData()
    }, []);

    if (isLoading) {
        return (
            <MainPageLoader />
        )
    }

    return (
        <div className='order-success-main-container'>
            <div className="order-success-first-div">
                <div className="order-success-first-div-left">
                    <div className="gift-img">
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/orderPlacedV2_cb4f64.png" alt="" />
                    </div>
                    <div className="order-place-heading">
                        <h2>Order placed for ₹{orderData && orderData.totalPayablePrice ? orderData.totalPayablePrice : ""}!</h2>
                        <p>Your {orderData && orderData.product ? orderData.product.length : ""} item will be delivered by Tue, Jul 11th 23</p>
                    </div>
                </div>

                <div className="order-success-first-div-right">
                    <div className="order-success-first-content">
                        <h2>Why call? Just click!</h2>
                        <p>Easily track all your FlipKart orders!</p>
                        <button onClick={()=>{window.location.href="/v1/orders"}}>Go to My Orders</button>
                    </div>
                    <div className="order-img">
                        <img src="https://img1a.flixcart.com/www/helpcenter/assets/images/1529927950114/group-2%403x.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="order-success-Second-div">
                <div className="order-success-Second-div-heading">
                    <h5>Delivery Address</h5>
                </div>
                <div className="order-success-Second-div-address">
                    <h5>{orderData.address.checkoutName}</h5>
                    <p>{orderData.address.checkoutAddress}, {orderData.address.checkoutPincode},{orderData.address.checkoutCityDistrictTown},{orderData.address.checkoutState}</p>
                </div>
                <div className="order-success-Second-div-phone-number">
                    <h5>Phone number</h5>
                    <p>{orderData.address.checkoutMobile}</p>
                </div>
            </div>
            <div className="order-success-Third-div">
                {orderData.product.map((product, index) => {
                    return (
                        <div className="order-success-Third-div-product-div" key={index}>
                            <div className="order-success-Third-div-product-img">
                                <img src={product.imageOne} alt="" />
                            </div>
                            <div className="order-success-Third-div-product-details">
                                <h5>{product.productName}</h5>
                                <p>Brand: {product.productBrand}</p>
                                <p>Price: ₹{product.productPrice - Math.round(product.productDiscount/100*product.productPrice)}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default OrderSuccessPage
