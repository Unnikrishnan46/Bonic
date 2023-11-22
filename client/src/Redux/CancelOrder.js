import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    cancelModal : false
}

const cancelModalState = createSlice({
    name:"cancelModalState",
    initialState:INITIAL_STATE,
    reducers:{
        setCancelModal:(state,action)=>{
            state.cancelModal=action.payload
        }
    }
});


export const {setCancelModal} = cancelModalState.actions;

export default cancelModalState.reducer