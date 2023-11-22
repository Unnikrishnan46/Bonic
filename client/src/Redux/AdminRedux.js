import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    productName: "",
    productPrice: "",
    productDescription: "",
    productMainCategory: "",
    productSubCategory: "",
    productSubSubCategory: "",
    productSize: "",
    productSKU: "",
    productBrand:"",
    productQuantity: "",
    productColor: "",
    productDiscount: 0,
    productTags: [],
    imageFileOne: null,
    imageFileTwo: null,
    imageFileThree: null,
    imageFileFour: null
}

const adminStates = createSlice({
    name: "admin",
    initialState: INITIAL_STATE,
    reducers: {
        setProductName: (state, action) => {
            state.productName = action.payload;
        },
        setProductPrice: (state, action) => {
            state.productPrice = action.payload;
        },
        setProductDescription: (state, action) => {
            state.productDescription = action.payload;
        },
        setProductMainCategory: (state, action) => {
            state.productMainCategory = action.payload;
        },
        setProductSubCategory: (state, action) => {
            state.productSubCategory = action.payload;
        },
        setProductSubSubCategory: (state, action) => {
            state.productSubSubCategory = action.payload;
        },
        setProductSize: (state, action) => {
            state.productSize = action.payload;
        },
        setProductSKU: (state, action) => {
            state.productSKU = action.payload;
        },
        setProductQuantity: (state, action) => {
            state.productQuantity = action.payload;
        },
        setProductColor: (state, action) => {
            state.productColor = action.payload;
        },
        setProductTags: (state, action) => {
            state.productTags = action.payload;
        },
        setProductDiscount: (state, action) => {
            state.productDiscount = action.payload;
        },
        setImageFileOne: (state, action) => {
            state.imageFileOne = action.payload;
        },
        setImageFileTwo: (state, action) => {
            state.imageFileTwo = action.payload;
        },
        setImageFileThree: (state, action) => {
            state.imageFileThree = action.payload;
        },
        setImageFileFour: (state, action) => {
            state.imageFileFour = action.payload;
        },
        setProductBrand: (state,action)=>{
            state.productBrand = action.payload;
        }
    }
})

export const { setProductName, setProductPrice, setProductDescription, setProductMainCategory, setProductSubCategory, setProductSubSubCategory, setProductSize, setProductSKU, setProductQuantity, setProductColor, setProductTags, setProductDiscount ,setImageFileOne ,setImageFileTwo , setImageFileThree ,setImageFileFour ,setProductBrand} = adminStates.actions;

export default adminStates.reducer;