import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: '',
  results: []
}

const searchMovieSlice = createSlice({
  name: "searchMovie",
  initialState,
  reducers: {
    setSearchResults: (state, action) => ({ key: action.payload.key, results: action.payload.results }),
  }
})

export const { setSearchResults } = searchMovieSlice.actions

export default searchMovieSlice.reducer