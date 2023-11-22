import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:undefined,
    userCartData:""
}

const userState = createSlice({
    name:"userState",
    initialState:initialState,
    reducers:{
        setUsersData:(state,action)=>{
            state.userData = action.payload
        },
        setUserCartData:(state,action)=>{
            state.userCartData = action.payload
        }
    }
});


export const {setUserCartData,setUsersData} = userState.actions;

export default userState.reducer;