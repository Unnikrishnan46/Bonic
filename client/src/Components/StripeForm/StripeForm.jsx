import React, { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useSelector ,useDispatch} from 'react-redux';
import { firestore } from '../../Firebase/Firebase';
import { addDoc ,collection,updateDoc,doc} from "firebase/firestore";
import "./StripeForm.css"
function StripeForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const checkoutData = useSelector((state) => state.CheckoutState)
    const [orderId,setOrderId] = useState(null)
    const cart = useSelector((state) => state.cartStates)
    const user = useSelector((state) => state.userState)


    const handlePaymentSuccess = async (paymentIntent) => {
        const urlParams = new URLSearchParams(window.location.search);
        const cartValue = urlParams.get('cart');
        const docRef = collection(firestore, "orders");
        if(cartValue === "true"){
            const docRef = doc(firestore, "cart", cart.cartItems.id);
            updateDoc(docRef, { product: [] }).then(()=>{

            }).catch((error)=>{
                console.log(error)
            })
        }
        await addDoc(docRef, checkoutData.orderInformation).then((doc)=>{
            setOrderId(doc.id)
            window.location.href= `https://bonic-server-jade.vercel.app/v1/orderSuccess?reference_id=${doc.id}`
        }).catch(error=>console.log(error))
        
      }
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true)
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `https://bonic-server-jade.vercel.app/v1/orderSuccess?reference_id=${orderId}`,
                receipt_email: 'erayamcode2004@gmail.com',
            },
            onSuccess: handlePaymentSuccess(),
        })

        if (error) {
            console.log(error)
            setMessage(error.message)
            setIsProcessing(false);
            return;
        }
        setIsProcessing(false)
    }

    
    return (
        <form id='payment-form' onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <PaymentElement />
            {message ? <small style={{ marginTop: "1rem", color: "red" }}>{message}</small> : ""}
            <button disabled={isProcessing} id='submit' className='stripe-pay-btn'>
                <span id='button-text'>
                    {isProcessing ? "Processing" : "Pay Now"}
                </span>
            </button>
        </form>
    )
}

export default StripeForm
