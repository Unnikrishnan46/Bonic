import React, { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import { addDoc, collection ,updateDoc,doc} from "firebase/firestore";
import { firestore } from '../../Firebase/Firebase';
import { formattedDate, formattedTime } from "../../Admin/Date&Time/Date&Time";
import { useSelector } from 'react-redux';
import "./CODPannel.css"

function CODPannel() {
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const checkoutData = useSelector((state) => state.CheckoutState)
    const user = useSelector((state) => state.userState)
    const cart = useSelector((state) => state.cartStates)

    console.log(checkoutData.checkoutProducts)

    const handleCaptchaChange = (value) => {
        setIsCaptchaVerified(value ? true : false);
    };

    const handleConfirmOrder = async() => {
        const urlParams = new URLSearchParams(window.location.search);
        const cartValue = urlParams.get('cart');
        if (isCaptchaVerified) {
            const orderInformation = {
                userId:user.userData.uid,
                address : checkoutData.userCheckoutData.addressOne,
                product: checkoutData.checkoutProducts,
                totalPayablePrice: checkoutData.totalPayablePrice,
                paymentMethod:"cod",
                paymentStatus:"Order Confirmed",
                cancelled:false,
                date: formattedDate,
                time: formattedTime
            }
            const docRef = collection(firestore, "orders");
            await addDoc(docRef, orderInformation).then((doc)=>{
                window.location.href = `http://localhost:3000/v1/orderSuccess?reference_id=${doc.id}`
            }).catch(error=>console.log(error))
            console.log('Order confirmed!');

            if(cartValue === "true"){
                const docRef = doc(firestore, "cart", cart.cartItems.id);
                updateDoc(docRef, { product: [] }).then(()=>{
    
                }).catch((error)=>{
                    console.log(error)
                })
            }
        }
    };

    return (
        <div>
            <ReCAPTCHA
                size="normal"
                sitekey="6LfcVgcnAAAAAOsAuSRTMH6LkyewqHr-nqnKHx2J"
                onChange={handleCaptchaChange}
            />
            <button className='cod-confirm-btn' onClick={handleConfirmOrder} disabled={!isCaptchaVerified}>CONFIRM ORDER</button>
        </div>
    )
}

export default CODPannel
