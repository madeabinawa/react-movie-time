import { createSlice } from '@reduxjs/toolkit'

const initialState = { isAuthenticated: false, token: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token
      }
    },

    authLogout: (state) => {
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        token: null
      }
    }
  }
})
export const { authLogin, authLogout } = authSlice.actions

export default authSlice.reducer