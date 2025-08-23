import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user: null,
  isUserAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state,action) => {
      
      state.user=action.payload
      state.isUserAuth = true;
    },
    clearUser: (state) => {
      state.user={}
      state.isUserAuth = false;
    },
    
  },
})

export const { saveUser,clearUser} = userSlice.actions

export default userSlice.reducer