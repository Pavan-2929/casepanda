import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageLink: null,
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageLink: (state, action) => {
      state.imageLink = action.payload.imageLink;
    },
  },
});

export const { setImageLink } = imageSlice.actions;
export default imageSlice.reducer;
