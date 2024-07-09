import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.productData = action.payload.productData;
    },
  },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;
