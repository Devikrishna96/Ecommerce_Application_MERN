import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seller: {},
  isSellerAuth: false,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    saveSeller: (state, action) => {
      state.seller = action.payload.seller || action.payload;
      state.isSellerAuth = true;
    },
    sellerLogout: (state) => {
      state.seller = {};
      state.isSellerAuth = false;
    },
  },
});

export const { saveSeller, sellerLogout } = sellerSlice.actions;

export default sellerSlice.reducer;
