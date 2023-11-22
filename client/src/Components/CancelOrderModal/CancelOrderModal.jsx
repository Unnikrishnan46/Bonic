import React from 'react'
import { firestore } from "../../Firebase/Firebase"
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setCancelModal } from "../../Redux/CancelOrder"
import "./CancelOrderModal.css"
function CancelOrderModal({selectedProduct,orderId}) {
    const dispatch = useDispatch()
    const cancelOrder = async () => {
        const docRef = doc(firestore, "orders", orderId);
        updateDoc(docRef, { cancelled: true, paymentStatus: "canceled" }).then(() => {
            dispatch(setCancelModal(false))
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            <div className="CancelOrderModal-header">
                <h4>Confirm Cancellation</h4>
            </div>
            <div className="CancelOrderModal-content">
                <div className="CancelOrderModal-content-left">
                    <p style={{fontFamily:"sans-serif"}}>You saved ₹100 on this product</p>
                </div>
                <div className="CancelOrderModal-content-right">
                    <img src={selectedProduct.imageOne} alt="" />
                </div>
            </div>
            <div className="CancelOrderModal-footer">
                <div className="CancelOrderModal-footer-content">
                    <p>If you cancel now you may not be able to avail this deal again. Do you still want to cancel ?</p>
                </div>
                <div className="CancelOrderModal-footer-btns">
                    <button className='CancelOrderModal-cancel-btn' onClick={()=>cancelOrder()}>Cancel Order</button>
                    <button className='CancelOrderModal-dont-cancel-btn'>Don't cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CancelOrderModal
