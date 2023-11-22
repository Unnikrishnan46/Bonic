import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems:"",
    cartCount:""
}

const cartStates = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setCartCount:(state,action)=>{
            state.cartCount = action.payload
        },
        setCartItems:(state,action)=>{
            state.cartItems = action.payload
        },
        setDecrement:(state,action)=>{
            state.cartCount = state.cartCount - 1
        },
        setIncrement:(state,action)=>{
            state.cartCount = state.cartCount + 1
        }
    }
});


export const {setCartCount,setCartItems,setDecrement,setIncrement} = cartStates.actions;

export default cartStates.reducer