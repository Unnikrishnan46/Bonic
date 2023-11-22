import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./Checkout.css";
import EditAddress from '../EditAddress/EditAddress';
import { firestore } from "../../Firebase/Firebase"
import { getDocs, collection, query, where ,doc , getDoc} from 'firebase/firestore'
import AddAddresss from '../AddAddress/AddAddresss';
import { setUserCheckoutData, setAddressEditPannel, setEditAddressForm, setCheckoutProducts, setTotalPayablePrice, setPaymentPannel } from "../../Redux/CheckoutRedux"
import MainPageLoader from "../Loader/MainPageLoader"
import PaymentPannel from '../PaymentPannel/PaymentPannel';

function Checkout() {
    const [isLoading, setIsLoading] = useState(true)
    const [addressData, setAddressData] = useState(null)
    const [isCart, setIsCart] = useState(false)
    const user = useSelector((state) => state.userState)
    const checkoutData = useSelector((state) => state.CheckoutState)
    const cart = useSelector((state) => state.cartStates)

    const dispatch = useDispatch()

    const getCheckoutData = async () => {
        if (user && user.userData && user.userData.uid) {
            try {
                const queryRef = query(collection(firestore, "address"), where("userId", "==", user.userData.uid));
                await getDocs(queryRef).then((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    dispatch(setUserCheckoutData(data[0]))
                    setAddressData(data[0])
                }).catch((error) => {
                    console.error(error)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getCheckoutData()
    }, [user.userData])


    const handleCheckoutProducts = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const cartValue = urlParams.get('cart');
        const productId = urlParams.get('productId');
        if (cartValue === "true" && user && user.userData && user.userData.uid) {
            const q = query(collection(firestore, "cart"), where("cartId", "==", user.userData.uid));
            await getDocs(q).then((querySnapshot) => {
                const datas = querySnapshot.docs.map((doc, index) => ({ ...doc.data().product }))
                const dataArray = Object.values(datas[0]);
                let totalPrice = 0;
                dataArray.forEach((product) => {
                    const discountedPrice = (product.productPrice - Math.round(product.productDiscount / 100 * product.productPrice));
                    totalPrice += discountedPrice;
                });
                dispatch(setTotalPayablePrice((totalPrice)));
                dispatch(setCheckoutProducts(dataArray))
                setIsCart(true)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            })
        }
        if(productId !== "null"){
            let totalPrice = 0;
            const docRef = doc(firestore, "test_data", productId);
            const product = await getDoc(docRef)
            const dataArray = [product.data()];
            const discountedPrice = parseInt(dataArray[0].productPrice) - Math.round(parseInt(dataArray[0].productDiscount) / 100 * parseInt(dataArray[0].productPrice));
            totalPrice += discountedPrice
            dispatch(setTotalPayablePrice(totalPrice));
            dispatch(setCheckoutProducts(dataArray))
            setIsLoading(false)
        }
    }

    


    const incrementProduct = async (product) => {
        dispatch(setCheckoutProducts([...checkoutData.checkoutProducts, product]));
        dispatch(setTotalPayablePrice((parseInt(checkoutData.totalPayablePrice) + parseInt(product.productPrice - Math.round(product.productDiscount / 100 * product.productPrice)))))
    }

    const decrementProduct = (product) => {
        const indexToRemove = checkoutData.checkoutProducts.findIndex((item) => item.productId === product.productId);

        if (indexToRemove !== -1) {
            const updatedArray = [
                ...checkoutData.checkoutProducts.slice(indexToRemove + 1),
                ...checkoutData.checkoutProducts.slice(0, indexToRemove)
            ];
            dispatch(setCheckoutProducts(updatedArray));
            dispatch(setTotalPayablePrice((parseInt(checkoutData.totalPayablePrice) - parseInt(product.productPrice - Math.round(product.productDiscount / 100 * product.productPrice)))))
        }
    }


    useEffect(() => {
        handleCheckoutProducts()
    }, [user.userData]);

    if (isLoading) {
        return (
            <MainPageLoader />
        )
    }

    const getUniqueProducts = (products) => {
        const uniqueProducts = {};
        products.forEach((product) => {
            if (uniqueProducts.hasOwnProperty(product.productName)) {
                uniqueProducts[product.productName].quantity += 1;
            } else {
                uniqueProducts[product.productName] = { ...product, quantity: 1 };
            }
        });
        return Object.values(uniqueProducts);
    };

    return (
        <div className='checkout-main-container'>
            <div className="checkout-main-left">
                {/* STEP 1  :   LOGIN CHECK */}
                <div className="checkout-loggedin-check">
                    <div className="checkout-steps-heading">
                        <p>1</p>
                        <h5>LOGIN</h5>
                        <span class="material-icons-sharp">check</span>
                    </div>
                    <div className="checkout-loggedin-check-email">
                        {user.userData ? <p>{user.userData.email}</p> : ""}
                    </div>
                </div>

                {/* STEP 2  :   ADDRESS CHECK */}
                {checkoutData.userCheckoutData && !checkoutData.addressEditPannel ?
                    <div className="checkout-adress-check">
                        <div className="checkout-address-heading">
                            <div className="checkout-address-and-heading">
                                <div className="checkout-address-heading-left">
                                    <p>2</p>
                                    <h5>DELIVERY ADDRESS</h5>
                                    <span class="material-icons-sharp">check</span>
                                </div>
                                <div className="show-address-div">
                                    <p className='checkout-address'><b>{checkoutData.userCheckoutData.addressOne.checkoutName} </b>{checkoutData.userCheckoutData.addressOne.checkoutMobile}</p>
                                </div>
                            </div>
                            <div className="checkout-address-heading-right">
                                <button className='change-address-btn' onClick={() => dispatch(setAddressEditPannel(true))}>CHANGE</button>
                            </div>
                        </div>
                    </div> : ""}

                {/* ADD ADDRESS */}
                {!checkoutData.userCheckoutData && !checkoutData.addressEditPannel ?
                    <div className="edit-address">
                        <div className="edit-address-header blue">
                            <p>2</p>
                            <h5>DELIVERY ADDRESS</h5>
                        </div>
                        <AddAddresss getCheckoutData={getCheckoutData} />
                    </div>
                    : ""}


                {checkoutData.editAddressForm ?
                    <div className="edit-address">
                        <div className="edit-address-header blue">
                            <p>2</p>
                            <h5>DELIVERY ADDRESS</h5>
                        </div>
                        <EditAddress addressData={addressData} />
                    </div>
                    : ""}



                {checkoutData.addressEditPannel && !checkoutData.editAddressForm ?
                    <div className="edit-address">
                        <div className="edit-address-header blue">
                            <p>2</p>
                            <h5>DELIVERY ADDRESS</h5>
                        </div>
                        <div className="edit-address-body">
                            <div className="edit-address-body-header">
                                <div className="edit-address-body-left-header">
                                    <input type="radio" checked />
                                    {checkoutData && checkoutData.userCheckoutData ? <p>{checkoutData.userCheckoutData.addressOne.checkoutName}</p> : ""}
                                    {checkoutData && checkoutData.userCheckoutData ? <p>{checkoutData.userCheckoutData.addressOne.checkoutMobile}</p> : ""}
                                </div>
                                <div className="edit-address-body-right-header">
                                    <button onClick={() => dispatch(setEditAddressForm(true))}>EDIT</button>
                                </div>
                            </div>

                            <div className="edit-address-show-address">
                                {checkoutData && checkoutData.userCheckoutData ? <p><b>{checkoutData.userCheckoutData.checkoutName} </b>{checkoutData.userCheckoutData.addressOne.checkoutAddress}</p> : ""}
                                <button onClick={() => dispatch(setAddressEditPannel(false))}>DELIVER HERE</button>
                            </div>
                        </div>

                    </div> : ""}


                {/* STEP  :  3 ORDER SUMMARY */}


                {checkoutData.addressEditPannel || checkoutData.paymentPannel ?
                    <div className='order-summary-div'>
                        <div className="checkout-steps-heading">
                            <p>3</p>
                            <h5>ORDER SUMMARY</h5>
                        </div>
                        <div className="checkout-address-heading-right">
                            <button className='change-address-btn' onClick={() => dispatch(setPaymentPannel(false))} hidden={checkoutData.addressEditPannel ? true : false}>CHANGE</button>
                        </div>
                    </div>
                    :
                    <div className="order-summary-main-div">
                        <div className="edit-address-header blue">
                            <p>3</p>
                            <h5>ORDER SUMMARY</h5>
                        </div>
                        {/* {isCart ? */}
                            <div className="order-product-main-div">
                                {checkoutData.checkoutProducts && checkoutData.checkoutProducts.length > 0 ? (
                                    getUniqueProducts(checkoutData.checkoutProducts).map((product, index) => (
                                        <div className="order-single-product-div" key={index}>
                                            <div className="order-single-product-aside">
                                                <img src={product.imageOne} alt="" />
                                                <div className="order-product-quantity-controller">
                                                    <button onClick={() => decrementProduct(product)} disabled={product.quantity === 1 ? true : false}>-</button>
                                                    <p>{product.quantity}</p>
                                                    <button onClick={() => incrementProduct(product)}>+</button>
                                                </div>
                                            </div>
                                            <div className="order-single-product-main">
                                                <h4>{product.productName}</h4>
                                                <small>Brand : {product.productBrand}</small>
                                                <div className="order-product-price-details">
                                                    <h6>₹{product.productPrice}</h6> <h4>₹{(product.productPrice - Math.round(product.productDiscount / 100 * product.productPrice)) * product.quantity}</h4> <span>{product.productDiscount}% off</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h1 hidden>null</h1>
                                )}
                            </div> 
                            {/* : ""} */}
                    </div>}

                {!checkoutData.paymentPannel ?
                    <div className="checkout-continue-div">
                        <p>Order confirmation email will be sent to <b>erayamcode2004@gmail.com</b></p>
                        <button hidden={checkoutData.addressEditPannel || checkoutData.editAddressForm ? true : false} onClick={() => dispatch(setPaymentPannel(true))}>CONTINUE</button>
                    </div> : ""}


                {/* STEP 4  : PAYMENT OPTIONS */}
                {!checkoutData.paymentPannel ?
                    <div className="checkout-loggedin-check">
                        <div className="checkout-steps-heading">
                            <p>4</p>
                            <h5>PAYMENT OPTIONS</h5>
                        </div>
                    </div> : ""}

                {checkoutData.paymentPannel ? <PaymentPannel /> : ""}



            </div>


            <div className="checkout-main-right">
                <div className="checkout-price-details-main">
                    <div className="checkout-price-details-header">
                        <h4>PRICE DETAILS</h4>
                    </div>

                    <div className="checkout-price-details-price">
                        <p>Price (3 item)</p>
                        <p>₹{checkoutData.totalPayablePrice}</p>
                    </div>

                    <div className="checkout-price-details-deelivery-charges">
                        <p>Delivery Charges</p>
                        <p style={{ color: "green" }}>FREE</p>
                    </div>

                    <div className="checkout-price-details-total-payable">

                        <p>Total Payable</p>
                        <p>₹{checkoutData.totalPayablePrice}</p>
                    </div>

                    <div className="checkout-price-details-total-payable">
                        <p style={{ color: "green", fontWeight: "bold" }}>Your total savings on this order ₹1,738</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
