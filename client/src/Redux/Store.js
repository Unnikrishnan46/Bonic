import { configureStore } from "@reduxjs/toolkit";
import switchPages from "./switchPages";
import adminStates from "./AdminRedux";
import cartStates from "./Cart";
import userState from "./UserData"
import CheckoutState from "./CheckoutRedux";
import cancelModalState from "./CancelOrder";
import wishlistState from "./Wishlist";

export const store = configureStore({
  reducer: {
    switchPages: switchPages,
    adminStates: adminStates,
    cartStates: cartStates,
    userState: userState,
    CheckoutState:CheckoutState,
    cancelModalState:cancelModalState,
    wishlistState:wishlistState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
})