import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { firestore } from '../../Firebase/Firebase';
import { updateDoc, doc } from "firebase/firestore";
import { loginModalTrue } from "../../Redux/switchPages"
import {setCheckoutProducts} from "../../Redux/CheckoutRedux"
import "./Style.css"
import NeedLogin from '../NeedLogin/NeedLogin';

function Cart({ getUserCart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [superTotal, setSuperTotal] = useState(0)
  const cartState = useSelector((state) => state.cartStates);
  const userState = useSelector((state) => state.userState);

  const dispatch = useDispatch()

  useEffect(() => {
    getUserCart()
  }, [])

  const productIncrement = async (product) => {
    const cartRef = doc(firestore, "cart", cartState.cartItems.id);
    const updatedProductArray = [...cartState.cartItems.product, product];
    await updateDoc(cartRef, { product: updatedProductArray }).then(() => {
      getUserCart();
      calculateTotalPrice()
    }).catch((error) => {
      console.log(error)
    })
  }

  const productDecrement = async (product) => {
    const cartRef = doc(firestore, "cart", cartState.cartItems.id);
    const updatedProductArray = [...cartState.cartItems.product];
    const index = updatedProductArray.indexOf(product)
    if (index !== -1) {
      updatedProductArray.splice(index, 1);
    }
    await updateDoc(cartRef, { product: updatedProductArray }).then(() => {
      getUserCart()
    }).catch((error) => {
      console.log(error)
    })
  }


  const removeCartItem = async (product) => {
    const cartRef = doc(firestore, "cart", cartState.cartItems.id);
    var filtered = cartState.cartItems.product.filter(function (value, index, arr) {
      return value.productId !== product.productId;
    });
    await updateDoc(cartRef, { product: filtered }).then(() => {
      getUserCart()
    }).catch((error) => {
      console.log(error)
    })
    console.log(filtered)
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [cartState.cartItems]);

  const calculateTotalPrice = () => {
    let total = 0;
    let discountTotal = 0;
    let superTotal = 0;
    if (cartState.cartItems && cartState.cartItems.product) {
      cartState.cartItems.product.forEach((item) => {
        total += item.productPrice - Math.round(item.productDiscount / 100 * item.productPrice)
        discountTotal += Math.round(item.productDiscount / 100 * item.productPrice)
        superTotal += Math.round(item.productPrice)
      });
    }
    setTotalPrice(total);
    setDiscountTotal(discountTotal);
    setSuperTotal(superTotal)
  };

  const handlePlaceOrder = () => {
    if (userState.userData) {
      dispatch(setCheckoutProducts(cartState.cartItems.product))
      var cart = true;
      var productId = null;
      var url = "/v1/checkout";

      url += "?cart=" + cart + "&productId=" + productId;
      window.location.href = url
    } else {
      dispatch(loginModalTrue());
    }
  }

  return (
    <>
    {!userState.userData ? <NeedLogin/> :
      <section className='cart-items'>
        <div className='container d_flex cart-contain'>

          <div className='cart-details'>
            {cartState.cartItems.product && cartState.cartItems.product.length === 0 ? <h1 className='no-items product'>No Items are add in Cart</h1> : ""}

            {cartState.cartItems ? [...new Map(cartState.cartItems.product.map(item => [item.productId, item])).values()].map((item, index) => {
              const quantity = cartState.cartItems.product.filter(prod => prod.productId === item.productId).length;
              const originalPrice = item.productPrice - Math.round(item.productDiscount / 100 * item.productPrice)
              const productQty = originalPrice * quantity

              return (
                <div className='cart-list cart-product d_flex' key={index}>
                  <div className='img'>
                    <img src={item.imageOne} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3 className='cart-prod-name'>{item.productName}</h3>
                    <h4>
                      ₹{item.productPrice - Math.round(item.productDiscount / 100 * item.productPrice)}.00 * {quantity}

                      <span>₹{productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart' onClick={() => { removeCartItem(item) }}>
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => { productIncrement(item) }}>
                        <i className='fa fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => { productDecrement(item) }}>
                        <i class="fas fa-minus" color='red'></i>
                      </button>
                    </div>
                  </div>
                </div>
              )
            }) : ""}

            {cartState.cartItems.product && cartState.cartItems.product.length > 0 ?
              <div className='cart-place-order-div d_flex'>
                <div className="cart-place-order-btn-div">
                  <button className='cart-place-order-btn' onClick={() => { handlePlaceOrder() }}>PLACE ORDER</button>
                </div>
              </div>

              : ""}
          </div>

          <div className='cart-total'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Price </h4>
              <h4>₹{superTotal}</h4>
            </div>

            <div className=' d_flex'>
              <h4>Discount </h4>
              <h4 style={{ color: "#388e3c" }}>-₹{discountTotal}</h4>
            </div>

            <div className=' d_flex' style={{ borderBottom: "1px solid rgb(3 0 71 / 9%)", paddingBottom: "1.5rem" }}>
              <h4>Delivery Charges </h4>
              <h4 style={{ color: "#388e3c" }}>Free</h4>
            </div>

            <div className=' d_flex' style={{ borderBottom: "1px solid rgb(3 0 71 / 9%)", paddingBottom: "2rem" }}>
              <b>Total Amount : </b>
              <h3>₹{totalPrice}</h3>
            </div>


            <div className=' d_flex' style={{ alignItems: "center" }}>
              <b style={{ color: "#388e3c" }}>You will save ₹{discountTotal} on this order</b>
            </div>

          </div>
        </div>
      </section> }
    </>
  )
}

export default Cart