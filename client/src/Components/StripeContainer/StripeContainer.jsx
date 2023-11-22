import React, { useState, useEffect } from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios"
import StripeForm from '../StripeForm/StripeForm';
import {setOrderInformation} from "../../Redux/CheckoutRedux";

function StripeContainer() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("")
  const checkoutData = useSelector((state) => state.CheckoutState)

  const user = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get("https://bonic-server-jade.vercel.app/config").then(async (response) => {
      const { publishableKey } = await response.data;
      setStripePromise(loadStripe(publishableKey))
    }).catch((error) => {
      console.log(error);
    })
  }, [])


  useEffect(() => {
    axios.post("https://bonic-server-jade.vercel.app/create-payment-intent",{orderUserData:checkoutData.userCheckoutData,orderProductData:checkoutData.checkoutProducts,totalPayable:checkoutData.totalPayablePrice,userEmail:user.userData.email,userId:user.userData.uid}).then(async (response) => {
      const { clientSecret } = await response.data;
      const {orderInformation} = await response.data;
      dispatch(setOrderInformation(orderInformation))
      setClientSecret(clientSecret)
    }).catch((error) => {
      console.log(error);
    })
  }, [])


  return (
    <>
    {stripePromise && clientSecret &&(
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeForm/>
      </Elements>
    )}
    </>

  )
}

export default StripeContainer
