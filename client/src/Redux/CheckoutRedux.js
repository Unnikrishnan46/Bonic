import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userCheckoutData: null,
    checkoutName: "",
    checkoutMobile: "",
    checkoutPincode: "",
    checkoutLocality: "",
    checkoutAddress: "",
    checkoutCityDistrictTown: "",
    checkoutState: "",
    checkoutLandmark: "",
    checkoutAlternateMobile: "",
    addressEditPannel:false,
    editAddressForm:false,
    checkoutProducts:[],
    totalPayablePrice:0,
    paymentPannel:false,
    orderInformation:null,
    orderId:null
}

const CheckoutState = createSlice({
    name: "checkout",
    initialState: initialState,
    reducers: {
        setUserCheckoutData: (state, action) => {
            state.userCheckoutData = action.payload
        },
        setCheckoutName: (state, action) => {
            state.checkoutName = action.payload
        },
        setCheckoutMobile: (state, action) => {
            state.checkoutMobile = action.payload
        },
        setCheckoutPincode: (state, action) => {
            state.checkoutPincode = action.payload
        },
        setCheckoutLocality: (state, action) => {
            state.checkoutLocality = action.payload
        },
        setCheckoutAddress: (state, action) => {
            state.checkoutAddress = action.payload
        },
        setCheckoutCityDistrictTown: (state, action) => {
            state.checkoutCityDistrictTown = action.payload
        },
        setCheckoutState: (state, action) => {
            state.checkoutState = action.payload
        },
        setCheckoutLandmark: (state, action) => {
            state.checkoutLandmark = action.payload
        },
        setCheckoutAlternateMobile: (state, action) => {
            state.checkoutAlternateMobile = action.payload
        },
        setAddressEditPannel:(state,action)=>{
            state.addressEditPannel = action.payload
        },
        setEditAddressForm:(state,action)=>{
            state.editAddressForm = action.payload
        },
        setCheckoutProducts:(state,action)=>{
            state.checkoutProducts = action.payload
        },
        setTotalPayablePrice:(state,action)=>{
            state.totalPayablePrice = action.payload
        },
        setPaymentPannel:(state,action)=>{
            state.paymentPannel = action.payload
        },
        setOrderInformation:(state,action)=>{
            state.orderInformation = action.payload
        },
        setOrderId:(state,action)=>{
            state.orderId = action.payload
        }
    }
});


export const { setUserCheckoutData, setCheckoutName, setCheckoutMobile, setCheckoutPincode, setCheckoutLocality, setCheckoutAddress, setCheckoutCityDistrictTown, setCheckoutState, setCheckoutLandmark, setCheckoutAlternateMobile ,setAddressEditPannel ,setEditAddressForm ,setCheckoutProducts ,setTotalPayablePrice ,setPaymentPannel,setOrderInformation ,setOrderId} = CheckoutState.actions

export default CheckoutState.reducer;