import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    signUpModal:false,
    loginModal:false
}

const switchPages = createSlice({
    name:"page",
    initialState: INITIAL_STATE,
    reducers:{
        signUpModalTrue : (state)=>{
            state.signUpModal = true
        },
        signUpModalFalse : (state)=>{
            state.signUpModal = false
        },
        loginModalTrue : (state)=>{
            state.loginModal = true
        },
        loginModalFalse : (state)=>{
            state.loginModal = false
        }

    }
});

export const {signUpModalTrue,signUpModalFalse,loginModalTrue,loginModalFalse} = switchPages.actions;

export default switchPages.reducer;