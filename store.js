import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import Expenseslice from "./expense-slice";


const Store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense:Expenseslice.reducer,
    }
});

export default Store;