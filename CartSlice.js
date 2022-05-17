import { createSlice } from "@reduxjs/toolkit";
import AvailableMeals from "../components/Meals/AvailableMeals";

const CartSlice = createSlice({
  name: "cartItem",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      let isAvailable = false;
    //   for (let i = 0; i <= state.items.length; i++) {
    //     if (action.payload.id === state.items[i]) {
    //       state.items[i]["amount"] =
    //         state.items[i]["amount"] + action.payload.amount;
    //         state.totalAmount = state.totalAmount + action.payload.price * action.payload.amount;
    //         console.log("item detected");
    //       isAvailable = true;
    //     }
    //   }
    //   if (!isAvailable) {
    //     const updatedItems = state.items.concat(action.payload);
    //     const updatedTotalAmount =
    //       state.totalAmount + action.payload.price * action.payload.amount;

    //     state.items = updatedItems;
    //     state.totalAmount = updatedTotalAmount;
    //     console.log("new item added");
    //     console.log(state.items);
    //   }
    const id = action.payload['id'];
    const name = action.payload['name'];
    const amount = action.payload['amount'];
    const price = action.payload['price'];
    const newItem = {
        id:id,
        name:name,
        amount:amount,
        price:price
    }
    console.log(id,name,amount,price);
      const updatedItems = [...state.items,newItem];
        const updatedTotalAmount =
          state.totalAmount + action.payload.price * action.payload.amount;

        state.items = updatedItems;
        state.totalAmount = updatedTotalAmount;
       

       
    },

    removeToCart(state, action) {},
  },
});

export const CartSliceAction = CartSlice.actions;

export default CartSlice;
