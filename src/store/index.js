import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./authSlice"
import orderReducer from "./orderSlice"
import searchMovieSlice from "./searchMovieSlice"
import layoutSlice from "./layoutSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    search: searchMovieSlice,
    layout: layoutSlice
  }
})