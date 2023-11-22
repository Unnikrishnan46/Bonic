import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MainPageLoader from '../Loader/MainPageLoader';
import { firestore } from "../../Firebase/Firebase"
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setCancelModal } from "../../Redux/CancelOrder"
import ProgressBar from '../ProgressBar/ProgressBar';
import { Modal } from "react-responsive-modal";
import CancelOrderModal from '../CancelOrderModal/CancelOrderModal';
import "react-responsive-modal/styles.css";
import "./OrderDetailPage.css";


function OrderDetailPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const { id } = useParams()
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [otherItems, setOtherItems] = useState(null);
    const searchParams = new URLSearchParams(window.location.search);
    const ref = searchParams.get('ref');
    const orderId = id.slice(3, id.length)
    const dispatch = useDispatch()

    const cancelState = useSelector((state) => state.cancelModalState)

    async function getOrderDetails() {
        const docRef = doc(firestore, "orders", orderId);
        await getDoc(docRef).then((querySnapshot) => {
            const data = querySnapshot.data()
            const matchingProduct = data.product.find(product => product.productId === ref);
            const otherITEMS = data.product
            setOrder(data)
            setSelectedProduct(matchingProduct)
            setOtherItems(otherITEMS)
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getOrderDetails()
    }, [])



    if (isLoading) {
        return (
            <MainPageLoader />
        )
    }


    return (
        <div className='OrderDetailPage-main-container'>
            <div className="OrderDetailPage-sub-main-container">
                <div className="OrderDetailPage-first-div">
                    <div className="OrderDetailPage-first-div-heading"><h4>Delivery Address</h4></div>
                    <div className="OrderDetailPage-first-div-ordername"><h4>{order.address.checkoutName}</h4></div>
                    <div className="OrderDetailPage-first-div-address">
                        <p>{order.address.checkoutAddress}</p>
                    </div>
                    <div className="OrderDetailPage-first-div-phonenumber">
                        <h4>Phone number</h4>
                        <p>{order.address.checkoutMobile},{order.address.checkoutAlternateMobile}</p>
                    </div>
                </div>

                <div className="OrderDetailPage-second-div">
                    <div style={{ display: "flex" }}>
                        <div className="OrderDetailPage-second-div-img">
                            <img src={selectedProduct.imageOne} alt="" />
                        </div>
                        <div className="OrderDetailPage-second-div-product-details">
                            <h5>{selectedProduct.productName}</h5>
                            <p>Brand: {selectedProduct.productBrand}</p>
                            <p>Seller: Raphale</p>

                            <h5>₹{selectedProduct.productPrice - Math.round(selectedProduct.productDiscount / 100 * selectedProduct.productPrice)}</h5>
                        </div>
                    </div>

                    <div className="OrderDetailPage-second-div-progress-div">
                        <ProgressBar status={order.paymentStatus} />
                    </div>
                    <div className="OrderDetailPage-second-div-right">
                        <button onClick={() => { dispatch(setCancelModal(true)) }}><span class="material-icons-sharp">highlight_off</span> Cancel</button>
                    </div>
                </div>

                <div className="OrderDetailPage-third-div">
                    <div className="OrderDetailPage-third-div-header">
                        <h4>Other items in this order</h4>
                    </div>
                    {otherItems.map((item, index) => {
                        return (
                            <div className="OrderDetailPage-third-div-single-product" key={index}>
                                <div className="OrderDetailPage-third-div-left">
                                    <div className="OrderDetailPage-third-div-img">
                                        <img src={item.imageOne} alt="" />
                                    </div>
                                    <div className="OrderDetailPage-third-div-product-details">
                                        <h5>{item.productName}</h5>
                                        <p>Price: ₹{item.productPrice - Math.round(item.productDiscount / 100 * item.productPrice)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal open={cancelState.cancelModal} onClose={() => dispatch(setCancelModal(false))} center classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
            }}>
                <CancelOrderModal selectedProduct={selectedProduct} orderId={orderId}/>
            </Modal>
        </div>
    )
}

export default OrderDetailPage
