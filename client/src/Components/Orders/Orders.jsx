import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { firestore } from "../../Firebase/Firebase"
import { getDocs, collection,query,where } from 'firebase/firestore'
import MainPageLoader from '../Loader/MainPageLoader';
import NeedLogin from '../NeedLogin/NeedLogin';
import "./Orders.css";

function Orders() {
    const user = useSelector((state) => state.userState)
    const [orders, setOrders] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const userState = useSelector((state) => state.userState);

    console.log(orders);

    async function getAllOrders() {
        if (user.userData) {
            const queryRef = query(collection(firestore, "orders"), where("userId", "==", user.userData.uid));
            await getDocs(queryRef).then((querySnapshot) => {
                const data = querySnapshot.docs.flatMap((doc) => (
                    doc.data().product.map((product) => ({
                        date: doc.data().date,
                        ...product,
                        id: doc.id,
                        paymentStatus: doc.data().paymentStatus
                    }))
                ));

 
                setOrders(data)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [user.userData])


    if (isLoading) {
        return (
            <MainPageLoader />
        )
    }

    if (!userState.userData) {
        return (
          <NeedLogin />
        )
      }

    return (
        <div className='orders-main-container'>
            <div className="orders-main-sub-container">
                <div className="orders-search-container">
                    <input type="search" />
                    <button><span class="material-icons-sharp">search</span> Search Orders</button>
                </div>

                {orders ? orders.map((product, index) => {
                    return (
                        <div className="order-single-main-div" key={index} onClick={()=>{window.location.href=`/v1/order/id:${product.id}?ref=${product.productId}`}}>
                            <div className="order-single-image-name">
                                <div className="order-single-img">
                                    <img src={product.imageOne} alt="" />
                                </div>
                                <div className="order-single-product-name" style={{marginLeft:"1rem"}}>
                                    <p className='pleaseda'>{product.productName}</p>
                                    <small>Brand: {product.productBrand}</small>
                                </div>
                            </div>
                            <div className="order-single-product-price">
                                <p>₹{product.productPrice}</p>
                            </div>
                            <div className="order-single-canceled">
                                <div className='span-'>
                                    <span style={{background:product.paymentStatus ==="canceled" ? "red" : "green"}}></span>
                                    <p>{product.paymentStatus} on Sun Jul 09</p>
                                </div>
                                <small>You requested a cancellation due to quality issues with the product.</small>
                            </div>
                        </div>
                    )
                }) : ""}
            </div>
        </div>
    )
}

export default Orders
