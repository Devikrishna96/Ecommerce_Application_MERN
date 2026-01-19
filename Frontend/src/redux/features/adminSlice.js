import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminInfo: null,
    isAdminAuth: false,
  },
  reducers: {
    saveAdmin(state, action) {
      state.adminInfo = action.payload;
      state.isAdminAuth = true;
    },
    adminLogout(state) {
      state.adminInfo = null;
      state.isAdminAuth = false;
    },
  },
});

export const { saveAdmin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
