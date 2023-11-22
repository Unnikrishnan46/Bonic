import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistItems: "",
    wishlistCount: ""
}

const wishlistState = createSlice({
    name: "wishlistState",
    initialState: initialState,
    reducers: {
        setWishlistItem: (state, action) => {
            state.wishlistItems = action.payload
        },
        setWishlistCount: (state, action) => {
            state.wishlistCount = action.payload
        }
    }
})


export const {setWishlistCount,setWishlistItem} = wishlistState.actions;
export default wishlistState.reducer;
